import React from 'react'
import Lottie from 'lottie-react';
import animationData from './../../../assets/chatBot.json'

const index = () => {
  return (
    <div className='h-[75%] text-white flex items-center justify-center flex-col gap-[5vh]'>
        <div className='h-[30vh] w-[30vw]'>
       <Lottie animationData={animationData} loop={true} />
        </div>

        <div className='mt-0 font-sans leading-0]'>
            <p className='text-[5vw] '>Welcome to <span className='font-bold text-[#6F00FF]'>BuzzChaty</span> </p>
            <p className='text-[1vw]'>Get ready for an amazing chat experience</p>
        </div>
    </div>


  )
}

export default index