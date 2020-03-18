// @flow

import * as E from '../engine/Engine.js';

E.Game.init({
  targetFrameRate: 60,
  fixedFrameRate: 60,
  timerMechanism: 'default',
});

// eslint-disable-next-line no-console
console.log(E.Time.targetDeltaTime);

E.Game.start();

// eslint-disable-next-line no-console
setTimeout(() => { E.Time.stop(); console.log('Frame: ', E.Time.frameCount, ' T: ', E.Time.now()); }, 1000 * 10);

// TODO: test Array<number> vs Array<Number> iteration speed
