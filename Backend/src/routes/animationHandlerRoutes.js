import { handelAllRequests } from "../controllers/animationHandlerContoller.js";
import express from "express";
import upload from '../middlewares/fileUpload.js';

const router = express.Router();

router.post('/generate/sequence/isl', upload.single('file'), handelAllRequests);

export default router;