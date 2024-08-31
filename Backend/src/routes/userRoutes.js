import express from 'express';
import { registerUser, loginUser, sentOtp , resetPassword , verifyEmail } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/sentotp', sentOtp);
router.post('/resetpassword', resetPassword);
router.post('/verifyemail', verifyEmail);

export default router;