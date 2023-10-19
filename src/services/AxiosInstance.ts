import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL: string = import.meta.env.VITE_REACT_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// request
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    config.headers = {
      "Content-Type": "application/json",
      "X-Project": "pcb_click",
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error: any) => {
    return error;
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.data.status === 401) ||
      (error.response && error.response.data.status === 409) ||
      (error.response && error.response.data.status === 404)
    ) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.response.message);
    }
  }
);

export default axiosInstance;
