import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://tution-dtn6.onrender.com/api';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  // Remove user token and info from local storage
  localStorage.removeItem('userToken');
  localStorage.removeItem('userInfo');
};

// Get current user
export const getCurrentUser = () => {
  const userToken = localStorage.getItem('userToken');
  const userInfo = localStorage.getItem('userInfo');
  
  return userToken && userInfo 
    ? { 
        token: userToken, 
        user: JSON.parse(userInfo) 
      } 
    : null;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
};