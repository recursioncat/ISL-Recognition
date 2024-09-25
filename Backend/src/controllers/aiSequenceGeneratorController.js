import { sequenceGen } from "../helpers/aiSequenceHandler.js";
import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";

export const aiSequenceGenerator = async(req, res) => {
    const {text} = req.body;
    
    if(!text) {
        return errorResponseHandler(res, 400, 'error', 'Please provide text to generate animation sequence');
    }

    try {
        const sequence = await sequenceGen(text);
        return responseHandler(res, 200, 'success', 'done', sequence.response.text());
    }catch(error) {
        return errorResponseHandler(res, 400, 'error', error);
    }
}
