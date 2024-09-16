import Message from '../models/messageModel.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    // Handle user joining a room for individual communication
    socket.on('joinRoom', ({ userId, recipientId }) => {
      socket.join(userId);
      socket.join(recipientId); // Ensure both users can communicate
    });

    // Handle sending a new message
    socket.on('sendMessage', async ({ sender, recipient, content }) => {
      try {
        const message = new Message({
          sender,
          recipient,
          content,
        });

        await message.save();

        // Emit the message to the recipient's room
        io.to(recipientId).emit('receiveMessage', message);
        // Optionally, you might want to also send the message to the sender
        // io.to(senderId).emit('receiveMessage', message);
      } catch (err) {
        console.error('Error sending message via Socket.IO:', err);
      }
    });

    // Clean up when a user disconnects
    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
};
