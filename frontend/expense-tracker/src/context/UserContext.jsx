import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in (set user info)
  const updateUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Function to log out (clear user info)
  const clearUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remove token
  };

  // Provide these values/functions to all children
  return (
    <UserContext.Provider value={{ user, isAuthenticated, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export default UserProvider;

