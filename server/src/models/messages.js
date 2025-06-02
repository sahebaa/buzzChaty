import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    messageType:{
        type:String,
        enum:["image","text","audio","video","document"],
    },
    messageContent:{
        type:String,
        required:true        
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,ref:'Users',
        required:true
    },
    visibility:{
        type:String,
        enum:['both','none','sender','receiver']
    },
    seen:{
        type:Boolean,
        default:false
    },
    seenTime:{
        type:Date,
    },
    timestamp: { type: Date, default: Date.now }
})

const Messages=mongoose.model("Messages",messageSchema);
export default Messages;
