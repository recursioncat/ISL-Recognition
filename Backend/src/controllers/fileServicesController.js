import { textTranslate, speechToText, imgToText, textToSpeech } from '../helpers/fileServicesHandler.js'
import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";


export const fileServicesController = async (req, res) => {

    try {

    const file = req.file;
    let result;
    
    //for URL
    // console.log(req.body.text)
    // result = await textToSpeech(); 
    // return responseHandler(res, 200, 'success', 'done', result);

    if(!file && !req.body.text) { //{ reminder biswajit: send text as json {text:data} }

        return errorResponseHandler(res, 400, 'error', 'Please upload an image or audio to get service');

    } else if(file) {

        const mimeType = file.mimetype;
        
        if (mimeType.startsWith('image/')) {

            result = await imgToText(file);
            
        } else if(mimeType.startsWith('audio/')) {
            
            result = await speechToText(file); 

        } else {

            return errorResponseHandler(res, 400, 'error', 'Unsupported file type' );

        }
        
    } else if(req.body.text) {
        
        const text = req.body.text;

        result = await textTranslate(text);
        
    } else {
        return errorResponseHandler(res, 400, 'error', 'Both files sent');
    }
    // console.log(result);

    return responseHandler(res, 200, 'success', 'done', result);

      
 } catch (error) {
        return errorResponseHandler(res, 400, 'error', error);
    }


};

