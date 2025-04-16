// userContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : {};
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return {};
    }
  });

  // Update localStorage when user value is changed or updated
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); 
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
