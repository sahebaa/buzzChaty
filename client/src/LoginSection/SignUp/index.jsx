import React, { useState } from 'react'
import bannerImg from './../../assets/banner.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  const [name,setName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [passwordType,setPasswordType]=useState(false);
  const [eye,setEye]=useState(false);

  const changePasswordType=()=>{
    if(!eye){
      setEye(true);
      setPasswordType(true);
    }else{
      setEye(false);
      setPasswordType(false);
    }
  }

  const handleSignupClick=()=>{
    console.log("Click regestired");
    navigate('/signin')
  }

  const handleSignInButtonClick=()=>{
    if(name.trim().length<2)
      return 'name fild is mandatory'
  }

  return (
    <div className='h-[100vh] w-[100%] bg-[#FFFFFF] flex items-center justify-center flex-col gap-[5vh]'>
      <p className='text-4xl font-bold bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparen'>Sign in to chat all over the world</p>
        <div className="container shadow-xl rounded-2xl w-[40vw] pb-[5vh] flex items-center justify-center  gap-[5vw]">
         <div className='user-input-box flex items-center justify-center  flex-col gap-[3vh] relative'>
            <input 
              type="text"
              placeholder='Enter your name' 
              value={name}
              onChange={e=>setName(e.target.value)}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800' 
            />
            <input 
              type="text"
              placeholder='Enter your last name' 
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800' 
            />
            <input 
              type="email" 
              placeholder='Enter your email'
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800'  
            />
            <input 
              type={passwordType?'password':'text'}
              placeholder='Enter your password'
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800'  
              />

            <input 
              type={passwordType?'password':'text'}
              placeholder='Enter your confirm password'
              value={confirmPassword}
              onChange={e=>setConfirmPassword(e.target.value)}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800'  
              />
              
              <button className='p-[0.5vh] w-[25vw] bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]  cursor-pointer text-white' onClick={handleSignInButtonClick}>SignIn</button>
              <p>
                Have an account? <span className='cursor-pointer text-blue-800' onClick={handleSignupClick}>Login</span>
              </p>
              {(eye)?
                  <FaEye className='absolute top-[38%] right-2 cursor-pointer' onClick={changePasswordType} />:
                  <FaEyeSlash className='absolute top-[38%] right-2 cursor-pointer' onClick={changePasswordType}/>}
         </div>
        </div>
        <p className='absolute bottom-0 text-gray-500 text-[10px]'>©Copyright 2025 this application belongs to creator sahebrao jadhav</p>
    </div>
  )
}

export default index
