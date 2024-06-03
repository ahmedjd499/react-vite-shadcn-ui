import axios from "axios";
const prefix = "task/";
const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";

export const addTaskApi = (data) => {
  return axios.post(url + prefix + "create", data);
};


export const updateTaskApi = (data,id) => {
  return axios.put(url + prefix + "update/"+id, data);
};

export const deleteTaskApi = (id) => {
  return axios.delete(url + prefix + "delete/"+id);
};

export const getTasks = (data) => {
  return axios.post(url + prefix + "find", data);
};

