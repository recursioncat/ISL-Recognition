import { textTranslate, speechToText, imgToText } from '../helpers/fileServicesHandler.js'
import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";
import { chatServicesHandler } from '../helpers/chatServicesHandler.js';


export const fileServicesController = async (req, res) => {

    try {

    const file = req.file;
    let result;

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
        
    } 
    // console.log(result);

    return responseHandler(res, 200, 'success', 'done', result);

      
 } catch (error) {
        return errorResponseHandler(res, 400, 'error', error);
    }


};

// handel featurs of chat app like text to speech, speech to text, image to text, text translation, isl to text etc.

export const chatServicesController= (io, users) => async ({userId , message , mediaUrl, selectedService }) => {
    

    if(!userId || (!message && !mediaUrl) || !selectedService) {
        return errorResponseHandler(res, 400, 'error', 'Please provide all required fields');
    }

    try {
        const response = await chatServicesHandler(userId, message, mediaUrl, selectedService);


        const serviceResponse = {
            _id : new Date().getTime(),
            sender : 'service-0012253966',
            recipient : userId,
            content : {
                message : response.result_type === 'text' ? response.result : '',
                mediaUrl : {
                    "url" : response.result_type !== 'text' ? response.result : '',
                    type : response.result_type,
                    audio : response.result_type === 'audio' ? true : false
                },
            },
            timestamp : new Date(),
        }
        
        io.to(users.get(userId)).emit("receiveMessage", serviceResponse);

    }catch (error) {
       console.log("Error sending req to the service via Socket.IO:", error);
    }
}