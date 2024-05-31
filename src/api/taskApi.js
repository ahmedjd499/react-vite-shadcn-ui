import axios from "axios";
const prefix = "task/";
const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";

export const addTaskApi = (data) => {
  return axios.post(url + prefix + "create", data);
};

