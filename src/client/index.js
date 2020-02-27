// @flow

import * as E from '../engine/Engine.js';

E.Game.init({
  targetFrameRate: 60,
  fixedFrameRate: 60,
  timerMechanism: 'default',
});

E.Game.start();

console.log(E.Time.targetDeltaTime);

setTimeout(() => { E.Time.stop(); console.log('Frame ', E.Game.frameCount); }, 1000 * 2);
