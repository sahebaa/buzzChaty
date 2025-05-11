import apiClient from "../utils/apiClient.js";

export const getUsers=async()=>{
    const response=await apiClient.get('/users');
    return response.data;
}

export const createUser=async(usersData)=>{
    const response=await apiClient.post('/users',usersData);
    return response.data;
} 