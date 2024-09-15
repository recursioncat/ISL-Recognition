import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "sent" }, // You can add 'delivered', 'read' as needed
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
