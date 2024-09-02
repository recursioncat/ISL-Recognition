import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";
import fs from "fs";
import axios from "axios";

export const sendImageAi = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return errorResponseHandler(res, 400, 'error', 'Please upload an image');
        }
        
        // path needs to be changed to the path of the image on the server
        const apiDataUpload = await axios.post('http://localhost:5000/upload', file.path).then((response) => {
            return responseHandler(res, 200, 'success', 'server picture uploaded successfully', { imageUrl: response.data });
        }).catch((error) => {
            return errorResponseHandler(res, 500, 'error', 'Problem uploading ai picture');
        }).finally(() => {
            fs.unlinkSync(file.path);
        });
        
      
        return responseHandler(res, 200, 'success', 'ai response generated successfully ' , { imageUrl: file.path, resData : apiDataUpload });
    } catch (error) {
        fs.unlinkSync(file.path);
        return errorResponseHandler(res, 500, 'error', 'Problem uploading ai picture');
}
}