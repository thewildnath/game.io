const express = require('express');
const socketio = require('socket.io');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

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
console.log('Server listening on port ', port);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
    console.log('Player connected: ', socket.id);
});