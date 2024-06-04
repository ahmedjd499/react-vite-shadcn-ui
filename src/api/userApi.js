import axios from "axios";
const prefix = "user/";
const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";

export const createUser = (data) => {
  return axios.post(url + prefix + "create", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const logInUser = (data) => {
  return axios.post(url + prefix + "login", data);
};
