import React from 'react'
import ContactSection from './ContactSection/index.jsx'
import ChatSection from './ChatSection'

const index = () => {
  return (
    <div className='main-chat h-[100vh] w-[100%] flex '>
     <ContactSection/>
      <ChatSection/>
    </div>
  )
}

export default index
