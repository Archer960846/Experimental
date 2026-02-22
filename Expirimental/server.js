const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
// Attach Socket.IO to the HTTP server
const io = socketio(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Listen for 'chatMessage' event from a client
    socket.on('chatMessage', (msg) => {
        // Emit the message to all connected clients (including the sender)
        io.emit('message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Use the PORT environment variable provided by Render, or 3000 locally
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
