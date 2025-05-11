import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainChat from './MainChat'
import  {Routes, Route } from 'react-router-dom';
import Login from '../src/LoginSection/LogIn'
import Signup from './LoginSection/SignUp'
import CompleteYourProfile from './LoginSection/CompleteYourProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/signup/completeyourprofile' element={<CompleteYourProfile/>}/>
            {/*<Route path="/chat" element={<ChatDashboard />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
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
