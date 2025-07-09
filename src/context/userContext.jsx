import { createContext, useState, useEffect } from "react";
import axios from "axios";

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

  // ✅ Sync to localStorage when user updates
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // ✅ Validate token on load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/other-auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser((prev) => ({
              ...prev,
              agentId: res.data.agentId,
            }));
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser({});
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
