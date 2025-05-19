import React, { useState,useEffect } from 'react'
import bannerImg from './../../assets/banner.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { redirect, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const index = () => {
  const navigate = useNavigate();
  const [name,setName]=useState(()=>{return localStorage.getItem('name')||''});
  const [lastName,setLastName]=useState(()=>{return localStorage.getItem('lastName')||''});
  const [email,setEmail]=useState(()=>{return localStorage.getItem('email')||''});
  const [password,setPassword]=useState(()=>{return localStorage.getItem('password')||''});
  const [confirmPassword,setConfirmPassword]=useState(()=>{return localStorage.getItem('confirmPassword')||''});
  const [passwordType,setPasswordType]=useState(false);
  const [eye,setEye]=useState(false);

  useEffect(()=>{
    const date=new Date(localStorage.getItem('date'));
    const currentDate=new Date();
    const diff=currentDate-date;
    const oneHrMillisecond=1*1000*60*60;

    console.log(typeof(date),diff,oneHrMillisecond);

    if(diff>oneHrMillisecond){
      console.log("it is working");
      localStorage.removeItem("password");
      localStorage.removeItem("confirmPassword");
    }

  },[])
  

  const changePasswordType=()=>{
    if(!eye){
      setEye(true);
      setPasswordType(true);
    }else{
      setEye(false);
      setPasswordType(false);
    }
  }

  const handleSignupClick=async()=>{
    navigate('/signin')
  }

  const handleSignInButtonClick=async()=>{
    console.log("Click regestired");

    if(name.trim().length<2)
      return toast.error('name fild is required'); 

    if(lastName.trim().length<2)
      return toast.error('last name fild is required'); 

    if(email.trim().length<2)
      return toast.error('email fild is required'); 

    if(password.trim().length<2)
      return toast.error('Password fild is required'); 

    if(confirmPassword.trim().length<2)
      return toast.error('confirm password fild is required');
    
    if(password!==confirmPassword)
      return toast.error("passsowrd and confiem password must match");

    //making api request here
    const date=new Date();
    localStorage.setItem('date',date);

    navigate('/signup/completeyourprofile');

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
              onChange={(e)=>{let val=e.target.value; setName(val); localStorage.setItem("name",val)}}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800' 
            />
            <input 
              type="text"
              placeholder='Enter your last name' 
              value={lastName}
              onChange={(e)=>{let val=e.target.value; setLastName(val); localStorage.setItem("lastName",val)}}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800' 
            />
            <input 
              type="email" 
              placeholder='Enter your email'
              value={email}
              onChange={(e)=>{let val=e.target.value; setEmail(val); localStorage.setItem("email",val)}}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800'  
            />
            <input 
              type={passwordType?'password':'text'}
              placeholder='Enter your password'
              value={password}
              onChange={(e)=>{let val=e.target.value; setPassword(val); localStorage.setItem("password",val)}}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800'  
              />

            <input 
              type={passwordType?'password':'text'}
              placeholder='Enter your confirm password'
              value={confirmPassword}
              onChange={(e)=>{let val=e.target.value; setConfirmPassword(val); localStorage.setItem("confirmPassword",val)}}
              className='p-[1vh] w-[25vw] border-2 border-b-gray-800'  
              />
              
              <button className='p-[0.5vh] w-[25vw] bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]  cursor-pointer text-white' onClick={handleSignInButtonClick}>SignIn</button>
              <Toaster  position="top-right"/>
              <p>
                Have an account? <span className='cursor-pointer text-blue-800' onClick={handleSignupClick}>Login</span>
              </p>
              {(eye)?
                  <FaEye className='absolute top-[52%] right-4 cursor-pointer' onClick={changePasswordType} />:
                  <FaEyeSlash className='absolute top-[52%] right-4 cursor-pointer' onClick={changePasswordType}/>}
         </div>
        </div>
        <p className='absolute bottom-0 text-gray-500 text-[10px]'>©Copyright 2025 this application belongs to creator sahebrao jadhav</p>
    </div>
  )
}

export default index


//we are on the handle signin button next 
//1.complet profile and then we will go to main page
//inside the complet profile image uploading is very important