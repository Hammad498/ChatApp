import mongoose from "mongoose";
import { Schema } from "mongoose";


const messageSchema=new Schema({
    message: {
      text: { type: String, required: true }
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Messages", messageSchema);
export default Message;