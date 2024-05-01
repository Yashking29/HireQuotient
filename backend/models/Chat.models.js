import mongoose from "mongoose";
import User from "./User.models.js"; // Assuming this is the correct import path for the User model

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References to users participating in the chat
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who sent the message
            text: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
