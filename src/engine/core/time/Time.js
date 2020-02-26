// @flow

import { getValue } from '../../utils/Utils.js';

type TIMER_MECHANISM = 'default' | 'raf' | 'timeout';

/* Timing manager */

export default class Time {
  // static timerMechanism: TIMER_MECHANISM;
  // The default frame rate of the engine
  static targetFrameRate: number;
  static targetDeltaTime: number;

  // The framerate used for fixed time updates (e.g. physics)
  static fixedFrameRate: number;
  static fixedDeltaTime: number;

  // The function used for continously updating
  static requestAnimationFrame: ((number) => void) => any;
  static rafHandle: any;

  static lastTimestamp: number;

  // The function to be called on each update
  static update: number => void;


  static init(config: any) {
    // If value is default, the timer will either match the environment's
    // refresh rate or it will run as fast as possible
    Time.targetFrameRate = getValue(-1, config.targetFrameRate);
    Time.targetDeltaTime = 1 / Time.targetFrameRate;

    Time.fixedFrameRate = getValue(50, config.fixedFrameRate);
    Time.fixedDeltaTime = 1 / Time.fixedFrameRate;

    Time.requestAnimationFrame = Time.getStepFunction(getValue('default', config.timerMechanism));
  }

  static start(update: number => void) {
    Time.update = update;

    // First initialise global variables, then start loop
    Time.rafHandle = Time.requestAnimationFrame((timestamp: number) => {
      Time.lastTimestamp = timestamp;

      // Start the main loop
      Time.rafHandle = Time.requestAnimationFrame(Time.step);
    });
  }

  static stop() {

  }

  static step(timestamp: number) {
    // Run again when ready
    Time.rafHandle = Time.requestAnimationFrame(Time.step);

    // Throttle frame rate
    if (timestamp < Time.lastTimestamp + Time.targetDeltaTime) {
      return;
    }

    Time.lastTimestamp = timestamp;

    Time.update(timestamp);
  }

  // By default try to use requestAnimationFrame
  // If not possible, fallback to custom function using setInterval
  static getStepFunction(timerMechanism: TIMER_MECHANISM): ((number) => void) => any {
    let mechanism: TIMER_MECHANISM = timerMechanism;
    // TODO: 'default' should pick 'timeout' if 'raf' is not available
    if (mechanism === 'default') {
      mechanism = 'raf';
    }
    if (mechanism === 'raf') {
      if (window != null && window.requestAnimationFrame != null) {
        // eslint-disable-next-line no-console
        console.log('Timer: raf');
        return window.requestAnimationFrame;
      }
      throw new Error('Could not find \'window.requestAnimationFrame\'');
    }

    // eslint-disable-next-line no-console
    console.log('Timer: timeout');

    return (function rafShell() {
      let lastTimestamp: number = Date.now();
      let now: number;
      let timeout: number;
      return function requestAnimationFrame(callback: (number) => void) {
        now = Date.now();
        // The next frame should run no sooner than the simulation allows,
        // but as soon as possible if the current frame has already taken
        // more time to run than is simulated in one timestep.
        timeout = Math.max(0, Time.targetDeltaTime - (now - lastTimestamp));
        lastTimestamp = now + timeout;
        return setTimeout(() => {
          callback(now + timeout);
        }, timeout);
      };
    }());
  }
}
