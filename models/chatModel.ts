import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user",
  },
  message: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
