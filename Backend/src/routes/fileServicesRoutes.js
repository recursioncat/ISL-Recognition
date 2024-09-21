import express from 'express';
import { fileServicesController } from '../controllers/fileServicesController.js';
import upload from '../middlewares/fileUpload.js';

const router = express.Router();

router.post('/sendfile', upload.single('file'), fileServicesController);

export default router;