import socketio from 'socket.io-client';

import { processGameUpdate } from './state';

const CONST = require('../shared/constants');

const socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
const socket = socketio(`${socketProtocol}://${window.location.host}`, { reconnection: false });

const connectedPromise = new Promise((resolve) => {
  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log(`Connected to server! Own id: ${socket.id}`);
  });
  resolve();
});

export const connect = (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(CONST.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Disconnected from server.');
      window.location.reload();
    });
  })
);

export const joinGame = (username) => {
  socket.emit(CONST.MSG_TYPES.JOIN_GAME, username);
};
