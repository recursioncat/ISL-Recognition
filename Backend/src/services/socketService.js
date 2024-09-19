import { sendMessages } from '../helpers/socketChatHandler.js';

export default (io) => {
    const users = new Map(); // To store user IDs and corresponding socket IDs

    io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        // Handle user joining a room with their unique recipient ID
        socket.on('joinRoom', ({ sender, recipient }) => {
            users.set(sender, socket.id); // Store the user's unique ID with their socket ID
            console.log(`User ${sender} joined with socket ID: ${socket.id}`);
        });

        // Handle sending a new message
        socket.on('sendMessage', sendMessages(io, users)); // Pass io and users map

        // Clean up when a user disconnects
        socket.on('disconnect', () => {
            users.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    users.delete(userId); // Remove user from the map when they disconnect
                    console.log(`User ${userId} disconnected`);
                }
            });
        });
    });
};
