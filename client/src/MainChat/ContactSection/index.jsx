import React, { useState } from 'react'
import chatData from './../../assets/chatSectionData.json'
import { IoMdPersonAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const index = () => {

  const[searchTerm,setSearchTerm]=useState("");
  const [currentIdx,setCurrentIdx]=useState("");

  const handleChatClick=(idx,e)=>{

    setCurrentIdx(idx);
    console.log(e);
  }


  const getcharacters=(userId,userEmail)=>{
    if(!userId)
      return userEmail[0].toUpperCase();

    let newStr="";
    newStr+=userId[0];

    for(let i=0;i<userId.length;i++){
      if(userId[i]==' '){
        newStr+=userId[i+1];
        break;
      }
    }
    console.log(newStr);
    return newStr.toUpperCase();
  }

  return (
    <div className='w-[30vw] h-[100%] flex justify-start flex-col flex-1 pl-[0.3rem] pr-[0.3rem] pt-[1vh]'>
      <div className='h-[5vh] flex items-center justify-between pl-[2vw] pr-[3vw] text-xl'>
        <h2 className='font-bold'>Chats</h2>
        <div className=' flex justify-between gap-[1vw]'>
            <IoMdPersonAdd />
            <BsThreeDotsVertical />
        </div>
      </div>
      <div className="pl-[1.3vw] searchbar flex items-center justify-between gap-[1vw] h-[6vh] bg-[#F5F5F5] rounded-lg ml-3 mr-3">
        <div className="search-icon">
        <CiSearch />
        </div>
        <div className="input-field flex-1 h-[3vh]">
          <input 
            className='border-none outline-none'
            type="text" 
            placeholder='Search contact To chat'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
        </div>
      </div>
      <div className='recent-chat overflow-x-hidden mt-[1vh]'>
      {
        chatData.map((chat,idx)=><div key={idx} onClick={()=>handleChatClick(idx,event)} className={`${(idx==currentIdx)?'bg-[#FFFADA]':null} `}>
            {
             <div className='chat-section p-1 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFFADA] active:bg-[#FFFADA] mr-[2vw]'>
               <div className='h-[40px] w-[40px] bg-yellow-300 rounded-full text-black flex items-center justify-center ml-2 font-semibold'>
                 {getcharacters(chat.reciver, chat.email)}
                </div>
                <div className="contect flex-1 truncate line-clamp-2 overflow-hidden whitespace-nowrap border-b-1 border-indigo-500">
                  <p className='font-semibold'>  { chat.reciver || chat.email}</p>
                  <p className='truncate w-full text-[1.8vh]'>HI:{chat.message}</p>
                </div>
              </div>
            }
          </div>)
        }
      </div>
    </div>
  )
}

export default index

