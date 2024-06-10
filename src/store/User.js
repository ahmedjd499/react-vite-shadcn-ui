import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const getInitialState = () => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (token && user && !isTokenExpired(token)) {
    return { user, token };
  }

  return { user: null, token: null };
};

export const useUserStore = create((set) => ({
  ...getInitialState(),
   
    addUser: (newUser) => {
      set((state) => ({...state, user: newUser }));
    },
    addtoken: (newToken) => {
      set((state) => ({ ...state,token: newToken }));
    },
    removeUser: () => {
      set(() => ({ user: null,token :null, }));
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')

    },
    

}))

