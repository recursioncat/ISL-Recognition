import Message from '../models/messageModel.js';
import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";

// Send a message
export const sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  // try {
  //   const message = new Message({
  //     sender: senderId,
  //     recipient: recipientId,
  //     content,
  //   });

  //   await message.save();

    // Emit the message to the recipient's room
    io.emit('sendMessage',{ senderId, recipientId, content });

    return responseHandler(res, 200, 'success', 'Message sent');
  // } catch (err) {
  //   return errorResponseHandler(res, 500, 'error', 'Error sending message');
  // }
};

// Fetch chat history between two users
export const getMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 },
      ],
    }).sort('timestamp');

    return responseHandler(res, 200, 'success', 'Messages fetched', { messages });
  } catch (err) {
    return errorResponseHandler(res, 500, 'error', 'Error fetching messages');
  }
};
