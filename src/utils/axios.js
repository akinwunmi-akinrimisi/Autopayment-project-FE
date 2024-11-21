import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token or other headers here
    const tokenString = localStorage.getItem('flexi_session');
    const token = JSON.parse(tokenString);
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // Maybe redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 