import { create } from "zustand";

const useUserChattingInfo=create((set)=>({
    isUserChatting:false,
    userInfo:null,

    setChattingStatus:(status)=>({isUserChatting:status}),

    setUserInfo:((userInfo)=>({userInfo})),

    updateUserInfo:(updatedFeild)=>
        set((state) => ({
            userInfo: { ...state.userInfo, ...updatedFeild },
        }),
    ),

    clearUserInfo:({userInfo:null}),
    

}))