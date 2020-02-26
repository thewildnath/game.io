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

  static update(timestamp: number) {
    // eslint-disable-next-line no-console
    console.log('update: ', timestamp);
  }
}
