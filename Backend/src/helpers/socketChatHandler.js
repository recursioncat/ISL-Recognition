import Message from "../models/messageModel.js";

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
