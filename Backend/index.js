import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import socketService from './src/services/socketService.js';
import dotenv from 'dotenv';
import Message from './src/models/messageModel.js';
dotenv.config(); // Load environment variables

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Initialize Socket.IO
socketService(io);

// app.post('/test-message', async(req, res) => {
//   const { senderId, recipientId, content } = req.body;
//   try {
//     const message = new Message({
//       sender: senderId,
//       recipient: recipientId,
//       content,
//     });

//     await message.save();

//     // Emit the message to the recipient's room
//     io.to(recipientId).emit('receiveMessage', message);
//     res.json({ message: 'Message sent' });
//   } catch (err) {
//     console.error('Error sending message via Socket.IO:', err);
//   }
// });

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});