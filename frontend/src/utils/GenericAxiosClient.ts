import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
)
  
  export default axiosClient;