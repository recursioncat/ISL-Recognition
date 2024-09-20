import express from 'express';
import { getUser,updateUser, uploadProfilePicture, getProfilePicture } from '../controllers/userProfileControllers.js';
import upload from '../middlewares/fileUpload.js';
import { UserAuth } from '../middlewares/Authentication/UserAuth.js';


const router = express.Router();

router.get('/getuser',UserAuth, getUser);
router.put('/updateuser', updateUser);
router.post('/upload-profile-picture', upload.single('profilePicture') , uploadProfilePicture);
router.get('/getProfilePicture/:id',UserAuth, getProfilePicture);

export default router;