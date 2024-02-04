import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import ApiService from '../services/ApiService'; // Import the ApiService

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await ApiService.fetchCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        setUser(null);
      } finally {
        setIsAuthInitialized(true);
      }
    };
    initializeAuth();
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthInitialized,
    login: async (credentials) => {
    try {
      const response = await ApiService.login(credentials);
      console.log('Login response:', response);
      setUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  }, 
  logout: async () => {
    try {
      const response = await ApiService.logout();
      setUser(null);
      return response;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
  isLoggedIn: !!user,
  }), [user, isAuthInitialized]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};