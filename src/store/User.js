import { create   } from "zustand";

const defaultUser = null

export const useUserStore=create((set)=>({
    user :defaultUser,
     token : null  ,
     authenticate: () => {
       if(!sessionStorage.getItem("user"))
        return false

       if(!sessionStorage.getItem("token"))
        return false
       
       if(!useUserStore.getState().token)
        useUserStore.addtoken(sessionStorage.getItem("token"))
       
       
       if(!useUserStore.getState().user)
        useUserStore.addUser(JSON.parse(sessionStorage.getItem("user")))
       
      const token = sessionStorage.getItem("token");
      const   user=JSON.parse(sessionStorage.getItem("user"))
      const storedToken = useUserStore.getState().token;
      const storedUser = useUserStore.getState().user;
      console.log(token === storedToken && user._id === storedUser._id);
  return  token === storedToken && user._id === storedUser._id;
    },
    addUser: (newUser) => {
      set((state) => ({...state, user: newUser }));
    },
    addtoken: (newToken) => {
      set((state) => ({ ...state,token: newToken }));
    },
    removeUser: () => {
      set(() => ({ user: defaultUser,token :null }));
    },
    

}))