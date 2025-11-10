import axios from 'axios';

// Base URL from environment or default
const BASE_URL = process.env.REACT_APP_API_URL || 'https://tution-dtn6.onrender.com/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token to request if exists
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    
    // Handle specific error scenarios
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized
          // Token might be expired or invalid
          localStorage.removeItem('userToken');
          localStorage.removeItem('userInfo');
          // Redirect to login or refresh token
          window.location.href = '/login';
          break;
        
        case 403: // Forbidden
          console.error('Access Denied:', error.response.data);
          break;
        
        case 404: // Not Found
          console.error('Resource Not Found:', error.response.data);
          break;
        
        case 500: // Internal Server Error
          console.error('Server Error:', error.response.data);
          break;
        
        default:
          console.error('Unexpected Error:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    // Always reject to allow catch block handling
    return Promise.reject(error);
  }
);

export default apiClient;
