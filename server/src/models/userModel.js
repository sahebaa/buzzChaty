import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    colorCode:{
        type:String,
    },
    profileImg:{
        type:String,
    },
    bio:{
        type:String
    },
    chats:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Chats'
    },
    contacts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Contacts'
    }
})

const Users=mongoose.model('Users',userSchema)
export default Users;

