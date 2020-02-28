// @flow

import perfNow from './performance.js';
import root from '../root.js';
import { getValue } from '../../utils/Utils.js';

type TIMER_MECHANISM = 'default' | 'raf' | 'timeout';

/* Timing manager */

export default class Time {
  // The timer mechanism that the update loop uses
  static timerMechanism: TIMER_MECHANISM;

  // The default frame rate of the engine
  static targetFrameRate: number;
  static targetDeltaTime: number;

  // The framerate used for fixed time updates (e.g. physics)
  static fixedFrameRate: number;
  static fixedDeltaTime: number;

  // Curent framerate information
  static deltaTime: number;
  static carryOver: number;
  static lastTimestamp: number;

  // The function used for continously updating
  static requestAnimationFrame: ((number) => void) => any;
  static cancelAnimationFrame: (any) => void;
  static rafHandle: any;

  static fps: number;
  static frameCount: number;
  static firstTimestamp: number;

  // The function to be called on each update
  static update: number => void;

  // TODO: Function should return 'game time', taking into account paused/background process
  static now = perfNow;

  static init(config: any) {
    // If value is default, the timer will either match the environment's
    // refresh rate or it will run as fast as possible
    Time.targetFrameRate = getValue(-1, config.targetFrameRate);
    Time.targetDeltaTime = Math.max(0, 1000 / Time.targetFrameRate);

    Time.fixedFrameRate = getValue(50, config.fixedFrameRate);
    Time.fixedDeltaTime = 1 / Time.fixedFrameRate;

    Time.requestAnimationFrame = Time.getRafFunction(getValue('default', config.timerMechanism));
  }

  static start(update: number => void) {
    Time.update = update;

    // First initialise global variables, then start loop
    Time.rafHandle = Time.requestAnimationFrame((timestamp: number) => {
      Time.lastTimestamp = timestamp;
      Time.carryOver = 0;

      Time.fps = 0;
      Time.frameCount = 0;
      Time.firstTimestamp = timestamp;

      // Start the main loop
      Time.rafHandle = Time.requestAnimationFrame(Time.step);
    });
  }

  static stop() {
    Time.cancelAnimationFrame(Time.rafHandle);
  }

  // Main timer loop
  static step(timestamp: number) {
    Time.rafHandle = Time.requestAnimationFrame(Time.step);

    const elapsed = timestamp - Time.lastTimestamp;

    if (elapsed > Time.targetDeltaTime) {
      Time.deltaTime = elapsed + Time.carryOver;

      const adjust = elapsed % Time.targetDeltaTime;
      Time.carryOver = adjust;
      Time.lastTimestamp = timestamp - adjust;

      // Calculate fps
      Time.frameCount += 1;
      Time.fps = (1000 * Time.frameCount) / (timestamp - Time.firstTimestamp);

      Time.update(timestamp);
    }
  }

  // By default try to use requestAnimationFrame
  // If not possible, fallback to custom function using setInterval
  static getRafFunction(timerMechanism: TIMER_MECHANISM): ((number) => void) => any {
    const rootRequestAnimationFrame = root.requestAnimationFrame // Chromium
      || root.webkitRequestAnimationFrame // Webkit
      || root.mozRequestAnimationFrame// Mozilla Geko
      || root.oRequestAnimationFrame // Opera Presto
      || root.msRequestAnimationFrame; // IE Trident

    if (root.cancelAnimationFrame != null) {
      Time.cancelAnimationFrame = root.cancelAnimationFrame.bind(root);
    }

    if (timerMechanism === 'default' && rootRequestAnimationFrame != null) {
      // eslint-disable-next-line no-console
      console.log('Timer: raf');
      Time.timerMechanism = 'raf';
      return rootRequestAnimationFrame.bind(root);
    }

    if (timerMechanism === 'raf') {
      if (rootRequestAnimationFrame) {
        // eslint-disable-next-line no-console
        console.log('Timer: raf');
        Time.timerMechanism = 'raf';
        return window.requestAnimationFrame.bind(root);
      }
      throw new Error('Could not find \'window.requestAnimationFrame\'');
    }

    // eslint-disable-next-line no-console
    console.log('Timer: timeout');
    Time.timerMechanism = 'timeout';

    Time.cancelAnimationFrame = clearTimeout.bind(root);

    let lastTimestamp: number = Time.now();
    let now: number;
    let timeout: number;
    return function requestAnimationFrame(callback: (number) => void) {
      now = Time.now();
      // The next frame should run no sooner than the simulation allows,
      // but as soon as possible if the current frame has already taken
      // more time to run than is simulated in one timestep.
      timeout = Math.max(0, Time.targetDeltaTime - (now - lastTimestamp));
      lastTimestamp = now + timeout;
      return setTimeout(() => {
        callback(now + timeout);
      }, timeout);
    };

    // return (function rafShell() {
    //   let lastTimestamp: number = Time.now();
    //   let now: number;
    //   let timeout: number;
    //   return function requestAnimationFrame(callback: (number) => void) {
    //     now = Time.now();
    //     // The next frame should run no sooner than the simulation allows,
    //     // but as soon as possible if the current frame has already taken
    //     // more time to run than is simulated in one timestep.
    //     timeout = Math.max(0, Time.targetDeltaTime - (now - lastTimestamp));
    //     lastTimestamp = now + timeout;
    //     return setTimeout(() => {
    //       callback(now + timeout);
    //     }, timeout);
    //   };
    // }());
  }
}
