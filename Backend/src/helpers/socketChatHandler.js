import Message from "../models/messageModel.js";
import User from "../models/UserModel.js";

export const sendMessages =
    (io, users) =>
    async ({ sender, recipient, content }) => {

        try {
            const message = new Message({
                sender,
                recipient,
                content,
                timestamp: new Date(), // Add timestamp here
            });


            await message.save();

            const recipientModel = await User.findById(recipient);

            const checkFriend = recipientModel.friendList.filter((friend) => friend.userId == sender);

            if (checkFriend.length == 0) {
                console.log("Friend not found, adding to friend list");
                try{
                    const senderModel = await User.findById(sender);
                    const senderFriend = {
                        userId: sender,
                        userName: senderModel.userName,
                        profilePicture: senderModel.profilePicture,
                        email: senderModel.email,
                    };
                  
                    recipientModel.friendList.push(senderFriend);
                    await recipientModel.save();
                }catch(err){
                    console.log("Error adding friend to recipient's friend list:", err);
                }
            }

 
            const recipientSocketId = users.get(recipient); // Get recipient's socket ID

            if (recipientSocketId) {
                // Emit the message to the recipient's specific socket ID
                io.to(recipientSocketId).emit("receiveMessage", message);
            } else {
                console.log("Recipient is not connected");
            }

            // Optionally, emit to the sender as well if needed
            io.to(users.get(sender)).emit("receiveMessage", message);
        } catch (err) {
            console.error("Error sending message via Socket.IO:", err);
        }
    };
