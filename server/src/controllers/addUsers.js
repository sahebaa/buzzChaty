import Users from "../models/userModel.js";

const addUsers=async ()=>{
    await Users.create({
        name:"new",
        lastName:"chat 3",
        email:"new5@gamil.com",
        password:"12345",
        colorCode:"#dddd",
        profileImg:"img/src/'here is yoru img",
        bio:"jail malhar nunrsay"
    }).then((message)=>{
        console.log("here is response",message)
    }).catch((error)=>{
        console.log("this is error",error);
    })
}

export default addUsers;