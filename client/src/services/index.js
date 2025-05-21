import apiClient from "../utils/apiClient.js";

export const getUsers=async()=>{
    const response=await apiClient.get('/users');
    return response.data;
}

export const createUser=async(usersData)=>{
    const response=await apiClient.post('/users',usersData);
    return response.data;
} 

export const loginUser=async(userData)=>{
    const response=await apiClient.post('/userSignUp/login',userData,
      {withCredentials:true},{
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
    return response.data;
}

export const checkLogin=async(userId)=>{
  const response=await apiClient.get(`/userSignUp/checkToken?id=${userId}`,
  {
    withCredentials: true
  },
  {
    headers:{
      'Content-Type':'applicaiton/json'
    }
  })
  return response.data;
}

export const signInUser=async(userData)=>{
  const response=await apiClient.post('/userSignUp/signIn',userData,{withCredentials:true},{headers:{
    'Content-Type':'applicaiton/json'
  }})
  return response;
};

export const checkUserEmailVerification=async(token,signIn)=>{
  const response=await apiClient.get(`/userSignUp/verify-email?token=${token}&isSignIn=${signIn}`,{withCredentials:true},{headers:{
    'Content-Type':'application/json'
  }})
  return response;
}

export const getAllChatsToPopulate = async (email) => {
  try {
    const response = await apiClient.post(
      '/chat/getAllchats',
      { user: email },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  } catch (err) {
    console.error("Error in getAllChatsToPopulate:", err);
    return null; // or throw if you want to handle it higher up
  }
};

///api/userSignUp/login