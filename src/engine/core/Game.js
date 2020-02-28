// @flow

import Time from './time/Time.js';
// import { getValue } from '../utils/Utils';

/* Main game manager */

export default class Game {
  static init(config: any) {
    // Initialise the timer module
    Time.init(config);
  }

  static start() {
    Time.start(Game.update);
  }

  static frameCount = 0;
  static update(timestamp: number) {
    Game.frameCount += 1;

    console.log('FPS: ', Time.fps, ' DT: ', Time.deltaTime);
  }
}
