import { v2 as cloudinary } from 'cloudinary';
import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";
import fs from "fs";

export const mediaUploadController = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return errorResponseHandler(
                res,
                400,
                "error",
                "Please upload an image"
            );
        }


        const result = await cloudinary.uploader.upload(file.path,{
            resource_type: "auto",
            folder: "media",
        });
       
        if (!result) {
            return errorResponseHandler(
                res,
                500,
                "error",
                "Problem uploading media"
            );
        }

        fs.unlinkSync(file.path);

        const finalResult = {
            url: result.url,
            resource_type: result.resource_type,
        };

        return responseHandler(
            res,
            200,
            "success",
            "Media uploaded successfully",
            {finalResult}
        );
    } catch (error) {
        fs.unlinkSync(file.path);
        console.log(error);
        return errorResponseHandler(
            res,
            500,
            "error",
            "Problem uploading profile picture"
        );
    }
};
