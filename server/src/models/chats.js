import mongoose, { Mongoose } from "mongoose";

const chatSchema=new mongoose.Schema({
    users:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Users",
        required:true
    },
    messages:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Messages"
    }
   /* lastMessage:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"Messages"
    }*/
})

const Chats=mongoose.model("Chats",chatSchema);
export default Chats;