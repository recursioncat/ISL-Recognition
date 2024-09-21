import translate from '@iamtraction/google-translate';
import responseHandler from "../utils/resHandler.js";
 //google api setup
 import vision from '@google-cloud/vision';
 import fs from 'fs';
 
 
 export const textTranslate = async (text) => {

    try {

        let translationOutput;

        await translate(text, { to: 'en' }).then(res => {

        translationOutput = res.text;

        }).catch(err => {
        
        console.error(err);
        
    });
    
    return { "Translation success" : translationOutput } ;
    
    } catch (error) {
        return { error: 'translation failed' }
    }
        
    }
    
    
    export const speechToText = async (file) => {

        const audiopath = file.path;

    }
    
    
    
    export const imgToText = async (file) => {
        
        const client = new vision.ImageAnnotatorClient();
        // console.log(file.mimetype);

        try {
        
        const imagePath = file.path;

        if (!fs.existsSync(imagePath)) {

            return res.status(400).json({ error: 'Image file does not exist' });

        }

        // Perform OCR using Google Cloud Vision
        const [result] = await client.textDetection(imagePath);

        const detections = result.textAnnotations;

        const text = detections[0] ? detections[0].description : '';
        
        // console.log(text);

       return {"Image to text success" : text} ;

    } catch (error) {

        // console.error(error);

        return { error: 'OCR processing failed' }
    }
    
}
