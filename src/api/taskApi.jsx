import { useUserStore } from "@/store/User";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const prefix = "task/";
const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: url,
});

// Add a request interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token; // Get the current token from the store
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status);
    return Promise.reject(error);
  }
);

export const handleUnauthorizedError = () => {
  const navigate = useNavigate();
  toast.error("Session expired, please reconnect!");
  navigate("/login");
  return <></>
};

// Add an error interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    return Promise.reject(error);
  }
);

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