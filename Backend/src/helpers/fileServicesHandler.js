import translate from '@iamtraction/google-translate';
import responseHandler from "../utils/resHandler.js";
 //google api setup
 import vision from '@google-cloud/vision';
 import fs from 'fs';
 
 
 export const textTranslate = async (text,ln = 'en') => {

    try {

        let translationOutput;

        await translate(text, { to: ln }).then(res => {

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

    try {
        let request;
        
        // Check if `file` is a URL (http or https)
        const isUrl = /^https?:\/\/.+\.(jpg|jpeg|png|bmp|gif)$/.test(file);

        if (isUrl) {
            // Prepare the request for a remote image (URL)
            request = {
                image: {
                    source: {
                        imageUri: file
                    }
                }
            };
        } else {
            // If it's not a URL, check if the local file exists
            if (!fs.existsSync(file.path)) {
                return { error: 'Image file does not exist' };
            }

            // Prepare the request for a local image file
            request = {
                image: {
                    content: fs.readFileSync(file.path) // Reads the file content as a buffer
                }
            };
        }

        // Perform OCR using Google Cloud Vision
        const [result] = await client.textDetection(request);

        const detections = result.textAnnotations;
        const text = detections[0] ? detections[0].description : '';

        return { "Image to text success": text };

    } catch (error) {
        console.error(error);
        return { error: 'OCR processing failed' };
    }
};