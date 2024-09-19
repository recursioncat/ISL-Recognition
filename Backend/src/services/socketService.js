import Message from '../models/messageModel.js';

export default (io) => {
  const users = new Map(); // To store user IDs and corresponding socket IDs

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    // Handle user joining a room with their unique recipient ID
    socket.on('joinRoom', ({ sender , recipient}) => {
      users.set(sender, socket.id); // Store the user's unique ID with their socket ID
      console.log(`User ${sender} joined with socket ID: ${socket.id}`);
    });

    // Handle sending a new message
    socket.on('sendMessage', async ({ sender, recipient, content }) => {
      try {
        const message = new Message({
          sender,
          recipient,
          content,
          timestamp: new Date() // Add timestamp here
        });

        await message.save();

        const recipientSocketId = users.get(recipient); // Get recipient's socket ID

        if (recipientSocketId) {
          // Emit the message to the recipient's specific socket ID
          io.to(recipientSocketId).emit('receiveMessage', message);
        } else {
          console.log('Recipient is not connected');
        }

        // Optionally, emit to the sender as well if needed
        io.to(socket.id).emit('receiveMessage', message);
      } catch (err) {
        console.error('Error sending message via Socket.IO:', err);
      }
    });

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
