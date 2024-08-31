import { v2 as cloudinary } from 'cloudinary';
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";
import fs from "fs";

export const getUser = async (req, res) => {

    try {
        const token = req.headers["x-auth-token"];

        if(!token) {
            return errorResponseHandler(res, 400, "error", "Please provide token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id.toString(); // Convert userId to a string

        const user = await User.findById(userId);

         if(!user) {
            return errorResponseHandler(res, 400, "error", "User does not exist");
        }

        return responseHandler(res, 200, "success", "Users fetched successfully", user);

    } catch (error) {
        return errorResponseHandler(res, 500, "error", "Problem fetching users");
    }
}

export const updateUser = async (req, res) => {
        const token = req.headers["x-auth-token"];

        if(!token) {
            return errorResponseHandler(res, 400, "error", "Please provide token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id.toString(); // Convert userId to a string

        const {fullName, gender, category} = req.body;

        try{
            const user = await User.findById(userId);

            if(!user) {
                return errorResponseHandler(res, 400, "error", "User does not exist");
            }

            user.fullName = fullName || user.fullName;
            user.gender = gender || user.gender;
            user.category = category || user.category;

            user.save();

            return responseHandler(res, 200, "success", "User updated successfully");
        }catch(error) {
            return errorResponseHandler(res, 500, "error", "Problem updating user");
        }
}

export const uploadProfilePicture = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return errorResponseHandler(res, 400, 'error', 'User ID is required');
    }

    try {
        const file = req.file;

        if (!file) {
            return errorResponseHandler(res, 400, 'error', 'Please upload an image');
        }

        const result = await cloudinary.uploader.upload(file.path);
        
        if (!result) {
            return errorResponseHandler(res, 500, 'error', 'Problem uploading profile picture');
        }

        fs.unlinkSync(file.path);

        const user = await User.findByIdAndUpdate(userId, {
            profilePicture: result.secure_url,
        }, { new: true });

        return responseHandler(res, 200, 'success', 'Profile picture uploaded successfully', user);
    } catch (error) {
        fs.unlinkSync(file.path);
        return errorResponseHandler(res, 500, 'error', 'Problem uploading profile picture');
}
}
