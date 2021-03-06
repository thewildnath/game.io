// @flow

import Time from './Time.js';
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

  static update(/* timestamp: number */) {
    // let sum = 0;
    // for (let i = 1; i <= 10000000; i += 1) {
    //   sum += Game.frameCount;
    // }

    if (Time.frameCount % 10 === 0) {
      // eslint-disable-next-line no-console
      console.log('FPS: ', 1000 / Time.deltaTime, ' ', Time.fps);
    }
  }
}
