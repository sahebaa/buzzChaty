import { create } from "zustand";

const useUserChattingInfo=create((set)=>({
    isUserChatting:false,
    userInfo:null,
    
    setChattingStatus:(status)=>set({isUserChatting:status}),

    setUserInfo:((userInfo)=>set({userInfo})),

    updateUserInfo:(updatedFeild)=>
        set((state) => ({
            userInfo: { ...state.userInfo, ...updatedFeild },
        }),
    ),

    clearUserInfo:set({userInfo:null}),

}))

export default useUserChattingInfo;