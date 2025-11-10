import apiClient from './apiInterceptor';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    
    // Store token and user info
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userInfo');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('userToken');
  const userInfo = localStorage.getItem('userInfo');
  
  return token && userInfo 
    ? { 
        token: token, 
        user: JSON.parse(userInfo) 
      } 
    : null;
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post('/auth/reset-password', { 
      token, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const validateResetToken = async (token) => {
  try {
    const response = await apiClient.post('/auth/validate-reset-token', { token });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Invalid or expired reset token');
  }
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  validateResetToken
};

export default authService;
