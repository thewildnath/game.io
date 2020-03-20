/* eslint-disable no-console */
// @flow

import * as E from '../engine/Engine.js';

E.Game.init({
  targetFrameRate: 60,
  fixedFrameRate: 60,
  timerMechanism: 'default',
});

// E.Game.start();
// setTimeout(() => {
//   E.Time.stop(); console.log('Frame: ', E.Time.frameCount, ' T: ', E.Time.now());
// }, 1000 * 10);

// TODO: test Array<number> vs Array<Number> iteration speed

const scene = new E.Scene('game');

console.log(JSON.stringify(scene));
