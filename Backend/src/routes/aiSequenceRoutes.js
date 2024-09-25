import { aiSequenceGenerator } from "../controllers/aiSequenceGeneratorController.js";
import express from "express";

const router = express.Router();

router.post('/generate/sequence', aiSequenceGenerator);

export default router;