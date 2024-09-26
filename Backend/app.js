import express from 'express';  
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './src/db/index.js';
import 'dotenv/config'// Import dotenv package to load environment variables
import userRoutes from './src/routes/userRoutes.js';
import userProfileRoutes from './src/routes/userProfileRoutes.js';
import sendImageAiRoutes from './src/routes/sendImageAiRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import friendListRoutes from './src/routes/friendListRoutes.js';
import mediaUploadRoutes from './src/routes/mediaUploadRoutes.js';
import fileServicesRoutes from './src/routes/fileServicesRoutes.js'
import aiSequenceRoutes from './src/routes/aiSequenceRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
import { createAudioFileFromText } from './src/services/testServices.js';

const app = express(); 


app.use(express.static("public"));
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
})); // Allow all CORS requests

app.use('/uploads', express.static('uploads'));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/user', userProfileRoutes);
app.use('/api/v1/ai/upload', sendImageAiRoutes);
app.use('/api/v1/chat', messageRoutes);
app.use('/api/v1/friend', friendListRoutes);
app.use('/api/v1/sender' , mediaUploadRoutes);
app.use('/api/v1/service/file' , fileServicesRoutes);
app.use('/api/v1/ai', aiSequenceRoutes);

connectDB();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/', async(req, res) => {
    const response = await createAudioFileFromText("Hello World"); 
    console.log(response);
    res.send('Hello World!'); 
});


// app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 5000}`);
// });

export default app;