// @flow

import express from 'express';
import socketio from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.dev.js';

// import * as E from '../engine/Engine';

// Setup an Express server
const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve
  app.use(express.static('dist'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
// eslint-disable-next-line no-console
console.log('Server listening on port ', port);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('Player connected: ', socket.id);
});


// for (let i = 1; i <= 100; i += 1) {
//   // eslint-disable-next-line no-console
//   console.log(E.root.performance.now());
// }
