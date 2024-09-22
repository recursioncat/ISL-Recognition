import express from 'express';
import { fileServicesController, chatServicesController } from '../controllers/fileServicesController.js';
import upload from '../middlewares/fileUpload.js';

const router = express.Router();

router.post('/sendfile', upload.single('file'), fileServicesController);
// router.post('/useService', chatServicesController);

export default router;