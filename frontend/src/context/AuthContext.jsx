import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('prowarranty_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.login({ email, password });
      setUser(data.user);
      localStorage.setItem('prowarranty_user', JSON.stringify(data.user));
      localStorage.setItem('prowarranty_token', data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to login');
      setLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.register({ name, email, password });
      setUser(data.user);
      localStorage.setItem('prowarranty_user', JSON.stringify(data.user));
      localStorage.setItem('prowarranty_token', data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prowarranty_user');
    localStorage.removeItem('prowarranty_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
