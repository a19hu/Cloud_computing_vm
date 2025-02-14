import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {IP_ADDRESS} from '../config';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(`http://${IP_ADDRESS}:8000/api/token/`, {
        username,
        password,
      });
      localStorage.setItem('access_token', res.data.access);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Login failed');
    }
  };


  const signup = async (username: string, email: string, password: string) => {
    try {
      await axios.post(`http://${IP_ADDRESS}:8000/api/register/`, {
        username,
        email,
        password,
      });
      // After successful registration, log the user in
      await login(username, password);
    } catch (error) {
      console.error("Error:", error);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};