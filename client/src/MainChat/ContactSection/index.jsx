import React, { useEffect, useState } from "react";
import chatData from "./../../assets/chatSectionData.json";
import { IoMdPersonAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Modal from "../Modal";
import { useNavigate } from 'react-router-dom';
import useUserStore from "../../store/userInfoStore";
import { getAllChatsToPopulate } from "../../services";
import ChatLoadingSkleton from './ChatSkeleton/';
import useUserChattingInfo from "../../store/userChattingInfo";

const index = () => {
  const navigate = useNavigate();
  const {isUserChatting,setChattingStatus,setUserInfo}=useUserChattingInfo();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentIdx, setCurrentIdx] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoadin] = useState(false);
  const [userIcon,setUserIcon]=useState("");
  const [contactSection,setContactSection]=useState([]);
  const [hasUserFetched,setHasUserFetched]=useState(false);
 // console.log("Here is my user ",hasUserFetched);

  const user=JSON.parse(useUserStore((state)=>state.user));

  useEffect(()=>{
    if(hasUserFetched)
      return;

    console.log("Here is your user",user);
    if(user?.name){
      const char=user.name.charAt(0).toUpperCase();
      setUserIcon(char);
    }else{
      const char=user?.email.charAt(0).toUpperCase();
      setUserIcon(char);
    }

    (async function () {
      const getAllUserChats=await getAllChatsToPopulate(user?.email ); 
      console.log("Here is response from get all chats ",getAllUserChats?.data?.message[0]?.userChats);
      const contactSectionRes=getAllUserChats?.data?.message[0]?.userChats;
      const contacts=contactSectionRes?.map((res)=>{
        return {
          messageType:res.lastMessage.messageType,
          messageContent:res.lastMessage.messageContent,
          otherUserName:res.otherUser.name,
          otherUserlastName:res.otherUser.lastName,
          otherUserEmail:res.otherUser.email,
          profileImg:res.otherUser.profileImg,
          colorCode:res.otherUser.colorCode
        }
      })
      console.log("here are your contacts section",contacts);
      setHasUserFetched(true);
      setContactSection(contacts);
      if(contacts){
        setHasUserFetched(true);
      }
      //setting up the contact section
    })
    ()
  },[user,hasUserFetched]);


  const handleChatClick = (chat,idx) => {
    console.log("cliked on chat");
    console.log("Whern u click u are getting this ",chat);
    setCurrentIdx(idx);
    const {otherUserName,otherUserlastName,otherUserEmail,profileImg}=chat
    const newUser={
      otherUserName,
      otherUserlastName,
      otherUserEmail,
      profileImg
    }
    setChattingStatus(true);
    setUserInfo(newUser);
    console.log("Value of is user chattingh",isUserChatting);
  };

  const handleYourProfileClick=()=>{
    console.log("Profile click button clicked");
    navigate('/your-profile-section')
  }

  const getcharacters = (userId,userLastName, userEmail) => {
    if (!userId) return userEmail[0].toUpperCase();

    let newStr = "";
    newStr += userId[0];

    for (let i = 0; i < userId.length; i++) {
      if (userId[i] == " ") {
        newStr += userId[i + 1];
        break;
      }
    }
    newStr+=userLastName.charAt(0);
    //console.log(newStr);
    return newStr.toUpperCase();
  };

  /*if(hasUserFetched && !contactSection?.length){
    return <div>You dont have conttacts to chat </div>
  }
  */
  if(!hasUserFetched)
    return <ChatLoadingSkleton/>

  return (
    <div className="w-[30vw] h-[100%] flex justify-start flex-col flex-1 pl-[0.3rem] pr-[0.3rem] pt-[1vh]">
      <div className="h-[5vh] flex items-center justify-between pl-[2vw] pr-[3vw] text-xl">
        <h2 className="font-bold">Chats</h2>
        <div className="flex items-center ml-[6rem] gap-[1.2rem]">
          {/* Tooltip for Person Add Icon */}
          <div className="relative group">
            <IoMdPersonAdd
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpenModal(true)}
            />
            <div className="absolute top-full left-1/2 translate-x-[-50%] mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              Add Contact
            </div>
          </div>

          {/* Tooltip for "S" Avatar */}
          <div className="relative group">
            <div onClick={handleYourProfileClick} className="h-8 w-8 bg-amber-950 text-white rounded-full text-lg flex items-center justify-center cursor-pointer">
              {(user?.profileImg)?user.profileImg:<p>{userIcon}</p>}
            </div>
            <div className="absolute top-full left-1/2 translate-x-[-50%] mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              Your Profile
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-bold mb-2">Hello guys!</h2>
        <p>Sahebrao Jadhav here.</p>
      </Modal>
      <div className="pl-[1.3vw] searchbar flex items-center justify-between gap-[1vw] h-[6vh] bg-[#F5F5F5] rounded-lg ml-3 mr-3">
        <div className="search-icon">
          <CiSearch />
        </div>
        <div className="input-field flex-1 h-[3vh]">
          <input
            className="border-none outline-none"
            type="text"
            placeholder="Search contact To chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/*Here is all the users with whom we are going to chat */}
      <div className="recent-chat overflow-x-hidden mt-[1vh]">
        {contactSection?.map((chat, idx) => (
          <div
            key={idx}
            onClick={() => handleChatClick(chat,idx)}
            className={`${idx == currentIdx ? "bg-[#FFFADA]" : null} `}
          >
            {
              <div className="chat-section p-1 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFFADA] active:bg-[#FFFADA] mr-[2vw]">
                <div className="h-[40px] w-[40px] bg-yellow-300 rounded-full text-black flex items-center justify-center ml-2 font-semibold">
                  {getcharacters(chat.otherUserName,chat.otherUserlastName,chat.otherUserEmail)}
                </div>
                <div className="contect flex-1 truncate line-clamp-2 overflow-hidden whitespace-nowrap border-b-1 border-indigo-500">
                  <p className="font-semibold"> {chat.otherUserName || chat.otherUserEmail} {(chat?.otherUserName)?chat.otherUserlastName:null}</p>
                  <p className="truncate w-full text-[0.9rem]">
                    saheb:{chat.messageContent}
                  </p>
                </div>
              </div>
            }
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default index;
