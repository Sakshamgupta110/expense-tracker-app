import axios from 'axios';
import { BASE_URL } from './ApiPaths';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout:10000,
  headers: {
    'Content-Type': 'application/json',
    Accept:"application/json"
  },
});

// Request interceptor for auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or however you store your JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized globally
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }else if(error.response.status=== 500){
        console.error("server error.please try again later")
      }
    }
    else if(error.code  === 'ECONNABORATED'){
        console.error("request timeout, please try again later")
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
