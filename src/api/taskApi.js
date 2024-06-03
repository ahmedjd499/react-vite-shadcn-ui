import { useUserStore } from "@/store/User";
import axios from "axios";

const prefix = "task/";
const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: url,
});

// Add a request interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().token; // Get the current token from the store
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const addTaskApi = (data) => {
  return axiosInstance.post(prefix + "create", data);
};

export const updateTaskApi = (data, id) => {
  return axiosInstance.put(prefix + "update/" + id, data);
};

export const deleteTaskApi = (id) => {
  return axiosInstance.delete(prefix + "delete/" + id);
};

export const getTasks = (data) => {
  return axiosInstance.post(prefix + "find", data);
};
