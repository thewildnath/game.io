import socketio from 'socket.io-client';

const socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
const socket = socketio(`${socketProtocol}://${window.location.host}`, {reconnection: false});

socket.on('connect', () => {
    console.log('Connected to server!');
});