import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype.startsWith('image/')){
            cb(null, '../uploads/images/');
        } else if (file.mimetype.startsWith('audio/')) {
            cb(null, '../uploads/audios/');
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, '../uploads/videos/');
        } 
        else {
            cb(null, '../uploads/others/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    // Define allowed MIME types and extensions
    console.log(`Received file: ${file.originalname}`);
    console.log(`MIME type: ${file.mimetype}`);
    const mimeTypes = {
        'image/jpeg': '.jpeg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'audio/mp3': '.mp3',
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'audio/m4a': '.m4a',  
        'video/mp4': '.mp4',
        'video/mkv': '.mkv',
    };
    
    if (mimeTypes[file.mimetype]){
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === mimeTypes[file.mimetype]) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file extension for MIME type ${file.mimetype}`), false);
        }
    } else {
        cb(new Error('Error: Only Images and Audio files are allowed!'), false);
    }
}


const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1920 * 40 }, // 5MB limit
    fileFilter,
    // fileFilter: (req, file, cb) => {
    //     const filetypes = /jpeg|jpg|png|wav|mpeg|mp3/;
    //     const mimetype = filetypes.test(file.mimetype);
    //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //     if (mimetype && extname) {
    //         return cb(null, true);
    //     } else {
    //         cb(new Error('Error: Only Images and Audio files are allowed!'), false);
    //     }
    // },
});

export default upload;