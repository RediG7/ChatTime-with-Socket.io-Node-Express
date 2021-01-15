const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
io.on('connection', socket => {
    // Welcome current user
    socket.emit('message', 'Welcome to ChatTime!'); // emit to single client

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat'); // emits to everybody except the user that is connecting

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })

    // broadcast to every client in general io.emit()

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message' ,msg);
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});

