import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainChat from './MainChat'
import  {Routes, Route } from 'react-router-dom';
import Login from '../src/LoginSection/LogIn'
import Signup from './LoginSection/SignUp'
import CompleteYourProfile from './LoginSection/CompleteYourProfile'
import VerifyYourEmail from './LoginSection/CompleteYourProfile/VerifyYourEmail'
import ChatDashboard from './MainChat';
import VerifyToken from './LoginSection/VerifyToken'
import YourProfileSection from './MainChat/ContactSection/YourProfileSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/signup/completeyourprofile' element={<CompleteYourProfile/>}/>
            <Route path='/signup/completeyourprofile/verify-your-email' element={<VerifyYourEmail/>}/>
            <Route path="/all-chats" element={<ChatDashboard />} />
            <Route path='/verify-token' element={<VerifyToken/>}/>
            <Route path='/your-profile-section' element={<YourProfileSection/>}/>
            {/*<Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/chat/settings" element={<ChatSettings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<AppSettings />} />
            <Route path="*" element={<NotFound />} />*/}
            <Route path='*' element={<Login/>}/>
          </Routes>
    </>
  )
}

export default App
