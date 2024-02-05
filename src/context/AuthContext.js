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
        window.location.href = "/auth";
      } catch (error) {
        setUser(null);
      } finally {
        setIsAuthInitialized(true);
      }
    };
    initializeAuth();
  }, []);
  
  const updateUser = async () => {
    try {
      const updatedUser = await ApiService.fetchCurrentUser(); 
      setUser(updatedUser);
    } catch (error) {
      setUser(null);
    }
  };

  const value = useMemo(() => ({
    user,
    isAuthInitialized,
    login: async (credentials) => {
      try {
        const response = await ApiService.login(credentials);
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
        throw error;
      }
    },
    isLoggedIn: !!user,
    updateUser
  }), [user, isAuthInitialized]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};