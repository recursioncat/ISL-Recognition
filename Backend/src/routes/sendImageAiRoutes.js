import express from 'express';
import { sendImageAi, sendImageFromUrl } from '../controllers/sendImageAiControllers.js';
import upload from '../middlewares/fileUpload.js';


const router = express.Router();

router.post('/sendimageai', upload.single('aiUpload'), sendImageAi);
router.post('/sendimagefromurl',  sendImageFromUrl);

export default router;