import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider to provide context value to the tree
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in a user
  const loginUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
