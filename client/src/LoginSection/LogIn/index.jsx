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
    navigate('/signup')
  }

  return (
    <div className='h-[100vh] w-[100%] bg-[#FFFFFF] flex items-center justify-center flex-col'>
      <p className='text-4xl font-bold bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparen'>Login to your account</p>
        <div className="container shadow-xl rounded-2xl w-[70vw] flex items-center gap-[5vw]">
         <img src={bannerImg} alt="img not loaded"  className="bg-none h-[60vh] w-[40vw]" />
         <div className='user-input-box flex flex-col gap-[3vh] relative'>
            <input 
              type="email" 
              placeholder='Enter your email'
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className='p-[1vh] w-[20vw] border-2 border-b-gray-800'  
            />
            <input 
              type={passwordType?'password':'text'}
              placeholder='Enter your password'
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className='p-[1vh] border-2 border-b-gray-800'  
              />
              <button className='p-[0.5vh] bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]  cursor-pointer text-white'>SignIn</button>
              <p>
                Don't have an account? <span className='cursor-pointer text-blue-800' onClick={handleSignupClick}>Signin</span>
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

