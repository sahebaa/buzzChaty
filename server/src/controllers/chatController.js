import { populate } from "dotenv";
import Chats from "../models/chats.js";
import Messages from "../models/messages.js";
import Users from "../models/userModel.js";

const createChat=async(req,res)=>{
    const {sender,receiver,messageContent,messageType,visibility}=req.body;
    try{
        const senderUser = await Users.findOne({ email: sender });
        const receiverUser = await Users.findOne({ email: receiver });
        //console.log(senderUser,receiverUser);

        //creation of messages
        const newMessage=new Messages({
            messageType,
            messageContent:messageContent,
            sender:senderUser,
            visibility
        });
        const messageRes=await newMessage.save();
        //added message to chat ̰ 
        //we will find that is chat alreaday exists

        const findChat=await Chats.findOne({
            users: { $all: [senderUser._id, receiverUser._id], $size: 2 }
        })

        let newChatRes;
        if(!findChat){
            const newChat=new Chats({
                users:[receiverUser,senderUser],
                messages:[messageRes._id]
            });
             newChatRes=await newChat.save();
             //here new chat is created and we put the id
             
             console.log("new chat res",newChatRes);
             //now we have to put this chat into our sener user and reciver user
             senderUser.chats.push(newChatRes._id);
             receiverUser.chats.push(newChatRes._id);
             senderUser.save();
             receiverUser.save();
        }else{
           // console.log("are we on the else block")
            //findChat.lastMessage.push(messageRes._id);
            findChat.messages.push(messageRes._id);
            newChatRes=await findChat.save();
        }
        
        console.log("until here working fine");

        return res.status(201).json({res:newChatRes});

        }catch(error){
            return res.status(500).json({"message":"something went wrong at chatController"});
        }
};

const getChat=async(req,res)=>{
    const {sender,receiver}=req.body;
    console.log(sender,receiver);
    const senderId=await Users.findOne({email:sender});
    const reciverId=await Users.findOne({email:receiver});

    //console.log(senderId._id,reciverId._id);

    const usersAllChats=
    await Users.findOne({email:sender}).
    populate({
        path:'chats',
        match: { users: reciverId }, 
        populate:{
            path:'messages',
            populate:{
                path:'sender',
                select:'name lastName email'
            }
        }
    });
    console.log("Here is your all chats",usersAllChats.chats[0].messages);

   const usersMessages=usersAllChats.chats[0].messages;

    return res.status(201).json({"Here are your messages":usersMessages});
}

const updateMessage=async (req,res)=>{
    const {chatId,updatedMessage}=req.body;
    try{
        const updatedRes=await Messages.updateOne(
            {_id:chatId},
            {
                $set:{messageContent:updatedMessage}
            }
        )
        //console.log("Here is your updated chat ",updateChat)
        return res.status(200).json({"message":"updated successfully"});
    }catch(err){
        console.log(err);
        return res.status(501).json({"message":"something went wrong happed on controller"});
    }
}

const deleteMessage=async(req,res)=>{
    const {email,deleteType,chatId}=req.body;

    const message=await Messages.findById(chatId);
    console.log("here is your message",message);
    const user=await Users.findOne({email:email});

    const date=new Date();
    const timeStmp=message.timestamp;

    const diff=date-timeStmp;

    const diffHours = diff / (1000 * 60 * 60);

    if(diffHours>24)
        return res.status(501).json({"message":"cannot edit message as it exceed 24 hr"});

        //console.log("can u this message",message.sender,user._id);
    
    const senderId=user._id;
    const messageId=message.sender;
    if(senderId.equals(messageId)){
        console.log("hello from this side")
    }

    if(deleteType==='both'){
        if(senderId.equals(messageId)){
            message.visibility="none";
            await message.save();
            return res.status(201).json({"message":"deleted successfully"});
        }
        else return res.status(501).json({"message":"Cannot delete as you are not owner of this message"});
    }

    if(deleteType==='me'){
        if(message._id==user._id){
            message.visibility='receiver';
            await message.save();
        }else{
            message.visibility='sender';
            await message.save();
        }
    }
    return res.status(403).json("chat deleted successfully");
}

/*const getAllChats = async (req, res) => {
    try {
      const { user } = req.body;
  
      const userRes = await Users.aggregate([
        { $match: { email: user } },
        {
          $lookup: {
            from: "chats",
            localField: "chats",
            foreignField: "_id",
            as: "userChats"
          }
        },
        {
          $unwind: "$userChats"
        },
        {
          $lookup: {
            from: "messages",
            let: { messageIds: "$userChats.messages" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$messageIds"] } } },
              { $sort: { timestamp: -1 } },
              { $limit: 1 },
              {
                $lookup: {
                  from: "users",
                  localField: "sender",
                  foreignField: "_id",
                  as: "senderInfo"
                }
              },
              {
                $unwind: {
                  path: "$senderInfo",
                  preserveNullAndEmptyArrays: true
                }
              },
              {
                $project: {
                  messageType: 1,
                  messageContent: 1,
                  timestamp: 1,
                  "senderInfo.name": 1,
                  "senderInfo.email": 1
                }
              }
            ],
            as: "lastMessage"
          }
        },
        {
          $addFields: {
            "userChats.lastMessage": { $arrayElemAt: ["$lastMessage", 0] }
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            email: { $first: "$email" },
            userChats: { $push: "$userChats" }
          }
        }
      ]);

      //console.log(userRes);

      const currentUserId=userRes[0]._id;

      const chats = userRes[0].userChats.map(chat => {
        const otherUserId = chat.users.find(id => id !== currentUserId);
        return {
          otherUserId,
          lastMessage: chat.lastMessage
        };
      });
      
      const resultObj={
        userId:userRes[0]._id,
        userName:userRes[0].name,
        userEmail:userRes[0].email,
        chats
    };

    console.log("Here is your result object ",resultObj);
  
      return res.status(200).json({ message: resultObj });
  
    } catch (error) {
      console.error("Error fetching chats:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };*/

  const getAllChats = async (req, res) => {
    try {
      const { user } = req.body;
  
      const userRes = await Users.aggregate([
        { $match: { email: user } },
  
        // Join user's chats
        {
          $lookup: {
            from: "chats",
            localField: "chats",
            foreignField: "_id",
            as: "userChats"
          }
        },
  
        // Unwind each chat to process individually
        { $unwind: "$userChats" },
  
        // Lookup the last message for the chat
        {
          $lookup: {
            from: "messages",
            let: { messageIds: "$userChats.messages" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$messageIds"] } } },
              { $sort: { timestamp: -1 } },
              { $limit: 1 },
              {
                $lookup: {
                  from: "users",
                  localField: "sender",
                  foreignField: "_id",
                  as: "senderInfo"
                }
              },
              { $unwind: { path: "$senderInfo", preserveNullAndEmptyArrays: true } },
              {
                $project: {
                  messageType: 1,
                  messageContent: 1,
                  timestamp: 1,
                  "senderInfo.name": 1,
                  "senderInfo.email": 1
                }
              }
            ],
            as: "lastMessage"
          }
        },
  
        // Add lastMessage to userChats
        {
          $addFields: {
            "userChats.lastMessage": { $arrayElemAt: ["$lastMessage", 0] }
          }
        },
  
        // Find the other user in the chat
        {
          $addFields: {
            otherUserId: {
              $first: {
                $filter: {
                  input: "$userChats.users",
                  as: "uid",
                  cond: { $ne: ["$$uid", "$_id"] }
                }
              }
            }
          }
        },
  
        // Join other user's info
        {
          $lookup: {
            from: "users",
            localField: "otherUserId",
            foreignField: "_id",
            as: "otherUserInfo"
          }
        },
        { $unwind: "$otherUserInfo" },
  
        // Re-group by original user to combine chats back into array
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            email: { $first: "$email" },
            userChats: {
              $push: {
                _id: "$userChats._id",
                users: "$userChats.users",
                lastMessage: "$userChats.lastMessage",
                otherUser: {
                  _id: "$otherUserInfo._id",
                  name: "$otherUserInfo.name",
                  email: "$otherUserInfo.email",
                  profileImg: "$otherUserInfo.profileImg",
                  colorCode: "$otherUserInfo.colorCode"
                }
              }
            }
          }
        }
      ]);
  
      return res.status(200).json({ message: userRes });
  
    } catch (error) {
      console.error("Error fetching chats:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export {
    createChat,
    getChat,
    updateMessage,
    deleteMessage,
    getAllChats
};

//we are creating delete chat api some sd required