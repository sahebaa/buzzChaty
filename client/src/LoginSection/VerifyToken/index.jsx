import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { checkUserEmailVerification } from '../../services';
import toast from 'react-hot-toast';

const index = () => {

const navigate = useNavigate();
const [searchParam]=useSearchParams();
const token=searchParam.get('token');
const signIn=searchParam.get('signIn');
  
useEffect(()=>{
   (async function() {
   try{
    const res=await checkUserEmailVerification(token,signIn);
    navigate('/all-chats')
   }catch(error){
    console.log("error occured while verifing token try again later",error);
    toast.success(error.response.data)
    navigate('/login');
   }
   })()
},[])

return (
    <div> 
       <div>
        <p>We are checking just a second</p>
        <span>{token}</span>
        <span>{signIn}</span>
       </div>
    </div>
  )
}

export default index
