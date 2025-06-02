import React, { useState } from 'react'
import ContactSection from './ContactSection/index.jsx'
import ChatSection from './ChatSection'
import { useEffect } from 'react'
import useUserStore from '../store/userInfoStore.js'
import ChattingSection from './ChattingSection'
import useUserChattingInfo from '../store/userChattingInfo.js'

const index = () => {
  const{isUserChatting}=useUserChattingInfo();
  const setUser=useUserStore((state)=>state.setUser);
  const user=useUserStore((state)=>state.user);

  useEffect(() => {
    const userObj=localStorage.getItem("logedInUser");
    setUser(userObj);
  }, []);
  
  console.log(isUserChatting);

  return (
    <div className='main-chat h-[100vh] w-[100%] flex '>
    <ContactSection/>
      {isUserChatting?<ChattingSection/>:<ChatSection/>}
    </div>
  )
}

export default index
