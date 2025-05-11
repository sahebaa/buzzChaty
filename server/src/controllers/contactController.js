import Contacts from "../models/contactsModel.js";
import Users from "../models/userModel.js";

const getAutoSuggestions = async (req, res) => {
    try {
      const { searchTerm } = req.query;
  
      if (!searchTerm || searchTerm.trim() === "") {
        return res.status(400).json({ error: "Search term is required" });
      }
  
      const users = await Users.find({
        name: { $regex: `^${searchTerm}`, $options: "i" }
      }).limit(5);
  
      return res.status(200).json({ suggestions: users });
    } catch (error) {
      console.error("Error fetching auto-suggestions:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

const getUserInfo=async (req,res)=>{
    try{
        const {userEmail}=req.body;

        if(!userEmail || userEmail.trim()=="")
            return res.status(400).json({error:"User email is required"});
    
        const user=await Users.findOne({email:userEmail});
    
        if(user)
            return res.status(200).json({"user":user});
        else
            return res.status(404).json({"error":"User not found"});
    }catch(err){
        console.log("error occured on controller getChatInfo",err);
        return res.status(500).json({"error":err});
    }
}

//step we will include here 
//1.when first time load the chat then one we will get this route /allContactForUsers then replace 
// with chat names

const addContactForUser=async(req,res)=>{
  try{
    const {userEmail,emailToSave,name,lastName}=req.body;
    console.log(userEmail);
    const user=await Users.findOne({email:userEmail});

    if(!user)
      return res.status(400).json({"err":"user with this email not found"});

    const newContact= new Contacts({
      name,
      lastName,
      email:emailToSave
    })


    const contactRes=await newContact.save();
    user.contacts.push(contactRes._id);
    const userRes=await user.save();
    return res.status(201).json({"message":userRes});

  }catch(err){
    console.log("error occred while adding contact",err);
    return res.status(500).json({"message":err});
  }
}

const editNameForUser=async(req,res)=>{
   try{
    const{user,emailToEdit,updatedName,updatedLastName}=req.body;
    //if email would be there we will update else we will insert
    const resp=await Users.findOne({email:user}).populate("contacts");

    console.log("here is your res",resp);
    return res.status(200).json({"result":resp});

   }catch(err){
    console.log("error occuerd",err);
    return res.status(500).json("message","Internal server error");
   }
}

export {
  addContactForUser,
  getAutoSuggestions,
  editNameForUser
}