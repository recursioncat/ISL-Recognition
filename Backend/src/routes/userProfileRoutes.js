import express from 'express';
import { getUser,updateUser, uploadProfilePicture } from '../controllers/userProfileControllers.js';
import upload from '../middlewares/fileUpload.js';


const router = express.Router();

router.get('/getuser', getUser);
router.put('/updateuser', updateUser);
router.post('/upload-profile-picture', upload.single('profilePicture') , uploadProfilePicture);

export default router;