// @flow

import * as E from '../engine/Engine.js';

// E.Game.init({
//   targetFrameRate: 60,
//   fixedFrameRate: 60,
//   timerMechanism: 'raf',
// });

// // eslint-disable-next-line no-console
// console.log(E.Time.targetFrameRate);
// // eslint-disable-next-line no-console
// console.log(E.Time.fixedFrameRate);

// E.Game.start();

for (let i = 1; i <= 100; i += 1) {
  // eslint-disable-next-line no-console
  console.log(E.Time.now());
}
