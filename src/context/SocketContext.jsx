import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    const socketIo = io("http://localhost:5000");

    socketIo.on("connect", () => {
      console.log("✅ Socket connected:", socketIo.id);
    });

   socketIo.on("notification", (data) => {
  console.log("📧 New notification received:", data); // You should see this!
  
  const newNotification = {
    _id: data._id || Date.now().toString(),
    userId: data.userId,
    message: data.message,
    type: data.type || "Updates",
    isRead: data.isRead || false,
    createdAt: data.createdAt || new Date().toISOString(),
    time: data.createdAt || new Date().toISOString()
  };

  setNotifications((prev) => [newNotification, ...prev]);
  setBadgeCount((prev) => prev + 1);
});


    socketIo.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  const deleteNotification = async (id) => {
    try {
      // Delete from backend
      const response = await fetch(`http://localhost:5000/agent-notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove from local state
        setNotifications((prev) => prev.filter((n) => n._id !== id && n.id !== id));
        setBadgeCount((prev) => Math.max(0, prev - 1));
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

const markAsRead = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/agent-notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setNotifications((prev) =>
        prev.map((n) =>
          (n._id === id || n.id === id) ? { ...n, isRead: true } : n
        )
      );
      setBadgeCount((prev) => Math.max(0, prev - 1)); // ✅ This reduces badge
    }
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};


  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        setNotifications,
        badgeCount,
        
        setBadgeCount,
        deleteNotification,
        markAsRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
