import express from 'express';
import { sendImageAi } from '../controllers/sendImageAiControllers.js';
import upload from '../middlewares/fileUpload.js';

const router = express.Router();

router.post('/sendimageai', upload.single('aiUpload'), sendImageAi);

export default router;