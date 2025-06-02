import React, { useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import useUserChattingInfo from "../../store/userChattingInfo";

const index = () => {
  const [userMessage, setUserMessage] = useState("");
  const {userInfo}=useUserChattingInfo();

  console.log("here what we recived from user info",userInfo)

  return (
    <div className="w-[70vw] h-[100%] bg-[#F6F6F7] flex items-center flex-col overflow-y-hidden relative overflow-x-hidden">
      <div className="upper-section h-[3rem] w-[100%] bg-amber-950 text-white">
        <div className="content flex items-center justify-between">
          <div className="flex items-center justify-start gap-[1rem] ml-[1rem]">
            <div className="profile-img h-[2rem] w-[2rem] bg-amber-400 flex items-center justify-center rounded-full">
              <p className="font-bold text-red-600">S</p>
            </div>
            <div className="user-info">
              <p className="text-[1rem] font-bold"> {(userInfo?.otherUserName)?`${userInfo.otherUserName+" "+userInfo.otherUserlastName}`:`${userInfo.otherUserlastName}`}</p>
              <p className="text-[0.8rem]">last seen 2 hr back</p>
            </div>
          </div>
          <div className="VideoAndAudioCall flex items-center justify-center gap-[2rem] pr-[2rem]">
            <div>
              <IoCall />
            </div>
            <div>
              <FaVideo />
            </div>
            <div>
              <IoMdMore />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full middleSection flex items-center justify-center">
            <p className="text-5xl"> {userInfo.otherUserEmail} from this side......... </p>
      </div>
      <div className="sendYourChatSection absolute bottom-0 w-full text-black px-2 py-1">
        <div className="flex items-center gap-2">
          {/* Add Icon */}
          <div className="text-2xl font-extrabold">
            <RiAddFill />
          </div>

          {/* Multiline textarea */}
          <TextareaAutosize
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            minRows={1}
            maxRows={6}
            placeholder="Enter your message..."
            className="flex-1 bg-[#E2DFD2] text-black placeholder:text- outline-none resize-none rounded-lg px-2 py-2"
          />

          {/* Right icons */}
          <div className="flex items-center gap-2 text-xl">
            <FaMicrophone />
            <IoSend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;


