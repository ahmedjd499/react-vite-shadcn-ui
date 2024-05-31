import { create } from "zustand";

const defaultUser = null

export const useUserStore=create((set)=>({
    user :true
      ,
      addUser : (newUser)=>{
        set(()=>{
            return {user : newUser}
        })
      },
      removeUser: ()=>{
        set(()=>{
            return {user : defaultUser}
        })
      },
      

}))