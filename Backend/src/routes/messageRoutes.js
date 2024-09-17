// routes/messageRoutes.js
import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// POST: Send a message
router.post('/message', sendMessage);

// GET: Fetch messages between two users
router.get('/messages/:userId1/:userId2', getMessages);

export default router;
