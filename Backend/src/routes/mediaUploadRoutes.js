import express from 'express';
import { mediaUploadController } from '../controllers/mediaUploadController.js';
import upload from '../middlewares/fileUpload.js';
import { UserAuth } from '../middlewares/Authentication/UserAuth.js';


const router = express.Router();

router.post('/upload-media', UserAuth , upload.single('mediaUpload') , mediaUploadController);

export default router;