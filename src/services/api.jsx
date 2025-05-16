// src/services/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

// console.log('Base URL:', baseURL);
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here, like authorization tokens if needed
  },
  // You can also configure timeouts, etc.
});

// Request interceptors (optional, for adding auth tokens, logging, etc.)
api.interceptors.request.use(
  (config) => {
    // Example: If you have an auth token in local storage
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // console.log('Request sent:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptors (optional, for handling errors globally, modifying responses, etc.)
api.interceptors.response.use(
  (response) => {
    // console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    // You can add global error handling logic here, like displaying a notification
    return Promise.reject(error);
  }
);

export default api;