import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  profile: {
    type: String,
    default:
      "https://ik.imagekit.io/hbzknb1hm/user.png?updatedAt=1707320612235",
  },
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
