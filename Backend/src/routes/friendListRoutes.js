// routes/messageRoutes.js
import express from 'express';
import { saveFriend, getFriendList, deleteFriend } from '../controllers/friendListController.js';

const router = express.Router();

// POST: Save a friend
router.post('/save-friend', saveFriend);
router.get('/get-friends/:userEmail', getFriendList);
router.delete('/delete-friend', deleteFriend);

export default router;