import React, { createContext, useContext, useState, useEffect } from 'react';

import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();


const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.replace(/^\/api\/?/, '').replace(/^\//, '');
  const cleanBase = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  return `${cleanBase}/api/${cleanEndpoint}`;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('digitoomasha_jwt_token') || '');

  useEffect(() => {
    const storedUser = localStorage.getItem('digitoomasha_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.avatar && parsed.avatar.includes('photo-1534528741775-53994a69daeb')) {
          parsed.avatar = '';
          localStorage.setItem('digitoomasha_user', JSON.stringify(parsed));
        }
        setUser(parsed);
      } catch (err) {
        localStorage.removeItem('digitoomasha_user');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(getApiUrl('/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Invalid email or password.',
        };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('digitoomasha_user', JSON.stringify(data.user));
      localStorage.setItem('digitoomasha_jwt_token', data.token);
      return { success: true, user: data.user };
    } catch (err) {
      console.error('Production Auth Connection Error:', err);
      return {
        success: false,
        message: 'Unable to communicate with the authentication database. Please ensure the backend service is running on port 5000.',
      };
    }
  };

  const signup = async (fullName, email, password, fullProfile = {}) => {
    try {
      const response = await fetch(getApiUrl('/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          ...fullProfile,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Registration failed. Please try again.',
        };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('digitoomasha_user', JSON.stringify(data.user));
      localStorage.setItem('digitoomasha_jwt_token', data.token);
      return { success: true, user: data.user };
    } catch (err) {
      console.error('Production Registration Connection Error:', err);
      return {
        success: false,
        message: err.message ? `Connection error: ${err.message}. Please refresh the page and ensure the backend is running.` : 'Unable to communicate with the registration database. Please ensure the backend service is running on port 5000.',
      };
    }
  };

  const updateUser = async (updatedFields) => {
    setUser((prevUser) => {
      const newUser = { ...(prevUser || {}), ...updatedFields };
      localStorage.setItem('digitoomasha_user', JSON.stringify(newUser));
      return newUser;
    });

    const storedUser = localStorage.getItem('digitoomasha_user');
    const userEmail = updatedFields.email || (storedUser ? JSON.parse(storedUser)?.email : null) || user?.email;

    if (userEmail) {
      try {
        await fetch(getApiUrl('/user/profile'), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, ...updatedFields })
        });
      } catch (err) {
        console.warn('Backend profile update warning:', err);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('digitoomasha_user');
    localStorage.removeItem('digitoomasha_jwt_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        token,
        isLoggedIn: !!user,
        login,
        signup,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
