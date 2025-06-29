import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance with base configuration
export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth tokens, etc.
axiosClient.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors here
        if (error.response?.status === 401) {
            // Handle unauthorized
            console.error('Unauthorized request');
        } else if (error.response?.status === 404) {
            // Handle not found
            console.error('Resource not found');
        }
        return Promise.reject(error);
    }
); 