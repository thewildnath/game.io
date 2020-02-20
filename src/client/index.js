// @flow

import { Game } from '../engine/core/Game';

const game: Game = new Game({
  targetFPS: 60,
  targetFixedFPS: 60,
});

// eslint-disable-next-line no-console
console.log(JSON.stringify(game));


// let current: number = 0;

// const targetFPS: number = 60;
// const targetDeltaTime = 1000 / targetFPS;

// let lastFrameTime: number = 0;
// let currentFrameTime: number = Date.now();
// let deltaTime: number = 0;

// const smoothRate: number = 50;
// const dts: Array<number> = [];
// let cId: number = 0;
// let sum: number = 0;

// for (let i = 0; i < smoothRate; i += 1) {
//   dts.push(0);
// }

// const timer = setInterval(() => {
//   lastFrameTime = currentFrameTime;
//   currentFrameTime = Date.now();
//   deltaTime = currentFrameTime - lastFrameTime;

//   // console.log(deltaTime);

//   if (current >= 1000) {
//     clearInterval(timer);
//     console.log('Done. Average: ', 1000 / (sum / smoothRate));
//   }

//   cId += 1;
//   if (cId === smoothRate) cId = 0;

//   sum -= dts[cId];
//   dts[cId] = deltaTime;
//   sum += deltaTime;

//   current += targetDeltaTime;
// }, targetDeltaTime);

// setTimeout(() => {
//   console.log('This is 1000. Current: ', current);
// }, 1000);
