import  mongoose from "mongoose";

const contactSchma= new mongoose.Schema({
    name:{
        type:String,
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    }
})

const Contacts=mongoose.model(Contacts,contactSchma);

export default Contacts;

