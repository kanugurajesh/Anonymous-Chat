import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    }
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;