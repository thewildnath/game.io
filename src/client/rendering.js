// @flow

import { getCurrentState } from './gamestate';

const CONST = require('../core/constants');

// Get the canvas graphics context
// $FlowFixMe.
const canvas: HTMLCanvasElement = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// TODO: Initially render the main menu
let renderInterval;

// TODO: Add camera object that controls rendering
// TODO: Scale camera dynamically based on resolution/aspect

export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderGame, 1000 / CONST.FRAME_RATE);
}

export function stopRendering() {
  clearInterval(renderInterval);
}

function renderGame() {
  const { player } = getCurrentState();

  renderPlayer(player);
}

function renderPlayer(player) {
  const centerX = canvas.width / 2 + player.x;
  const centerY = canvas.height / 2 + player.y;
  const radius = 70;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
}
