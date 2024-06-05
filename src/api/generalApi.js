import axios from "axios";
const prefix = "general/";
const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";



export const youtubeDownload = (data) => {
  return  axios({
    method: 'post',
    url: url + prefix + "api/download",
    data: data,
    responseType: 'blob',

  });
};


