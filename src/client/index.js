// @flow

import * as E from '../engine/Engine.js';

E.Game.init({
  targetFrameRate: 240,
  fixedFrameRate: 60,
  timerMechanism: 'default',
});

console.log(E.Time.targetDeltaTime);

E.Game.start();

setTimeout(() => { E.Time.stop(); console.log('Frame: ', E.Game.frameCount, ' T: ', E.Time.now()); }, 1000 * 10);
