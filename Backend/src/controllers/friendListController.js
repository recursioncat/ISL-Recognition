import User from "../models/UserModel.js";

import responseHandler from "../utils/resHandler.js";
import errorResponseHandler from "../utils/errorResponseHandler.js";

export const saveFriend = async (req, res) => {
    const { userEmail, friendEmail } = req.body;

    try {
        const user = await User.findOne({email: userEmail});

        if(!user) {
            return errorResponseHandler(res, 400, "error", "User does not exist");
        }

        const friend = await User.findOne({email: friendEmail});

        if(!friend) {
            return errorResponseHandler(res, 400, "error", "Friend does not exist");
        }

        user.friendList.push({userId: friend._id});
        await user.save();

        return responseHandler(res, 200, "success", "Friend saved successfully");

    } catch (error) {
        return errorResponseHandler(res, 500, "error", "Problem saving friend");
    }
}

export const getFriendList = async (req, res) => {
    const { userEmail } = req.params;

    try {
        const user = await User.findOne({email: userEmail});

        if(!user) {
            return errorResponseHandler(res, 400, "error", "User does not exist");
        }

        const friendList = user.friendList;
        
        if(friendList.length === 0) {
            return responseHandler(res, 200, "success", "No friends found");
        }

        return responseHandler(res, 200, "success", "Friend list fetched successfully", friendList);

    } catch (error) {
        return errorResponseHandler(res, 500, "error", "Problem fetching friend list");
    }
}

export const deleteFriend = async (req, res) => {
    const { userEmail, friendEmail } = req.body;
   
    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return errorResponseHandler(res, 400, "error", "User does not exist");
        }

        const friend = await User.findOne({ email: friendEmail });

        if (!friend) {
            return errorResponseHandler(res, 400, "error", "Friend does not exist");
        }
        // Assuming friendList is an array of objects with userId
        const updatedFriendList = user.friendList.filter(friendObj => friendObj.userId.toString() !== friend._id.toString());

        // Check if any deletion happened
        if (updatedFriendList.length === user.friendList.length) {
            return errorResponseHandler(res, 400, "error", "Friend not found in the list");
        }

        // Update the user's friend list
        user.friendList = updatedFriendList;

        // Save the updated user document
        await user.save();

        return responseHandler(res, 200, "success", "Friend deleted successfully");

    } catch (error) {
        return errorResponseHandler(res, 500, "error", "Problem deleting friend");
    }
};
