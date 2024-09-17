import Message from '../models/messageModel.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    // Handle user joining a room for individual communication
    socket.on('joinRoom', ({ sender, recipient }) => {
      socket.join(sender);
      socket.join(recipient); // Ensure both users can communicate
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

        // Emit the message to the recipient's room
        io.to(recipient).emit('receiveMessage', message);

        // Optionally, emit to the sender as well if needed
        // io.to(sender).emit('receiveMessage', message);
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
