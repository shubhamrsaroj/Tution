import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    console.group('AuthContext Initialization');
    console.log('Stored User:', storedUser);
    
    if (storedUser) {
      console.log('Setting user:', storedUser.user);
      console.log('User Username:', storedUser.user?.username);
      console.log('User Email:', storedUser.user?.email);
      
      setUser(storedUser.user);
      setIsAuthenticated(true);
    }
    
    console.groupEnd();
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    console.group('Login Process');
    console.log('User Data:', userData);
    
    // Ensure we're setting the correct user object
    const userToSet = userData.user || userData;
    
    setUser(userToSet);
    setIsAuthenticated(true);
    
    console.log('Authenticated User:', userToSet);
    console.groupEnd();
  };

  const logout = () => {
    authService.logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
