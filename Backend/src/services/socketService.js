// services/socketService.js
import Message from '../models/messageModel.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    // Join user room for individual communication
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
    });

    // Listen for a new message and save it
    socket.on('sendMessage', async ({ senderId, recipientId, content }) => {
      try {
        const message = new Message({
          sender: senderId,
          recipient: recipientId,
          content,
        });

        await message.save();

        // Emit the message to the recipient's room
        io.to(recipientId).emit('receiveMessage', message);
      } catch (err) {
        console.error('Error sending message via Socket.IO:', err);
      }
    });
  });
};
 