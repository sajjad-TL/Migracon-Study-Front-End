import { useContext, useEffect, useState } from 'react';
import { X, Clock, UserPlus, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'timeago.js';
import NotificationsNavbar from '../layouts/NotificationsNavbar';
import { UserContext } from '../context/userContext';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

export default function Notification() {
  const { user } = useContext(UserContext);
  const { notifications, setNotifications, badgeCount, setBadgeCount, deleteNotification, markAsRead, socket } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  // Enhanced fetch function with better error handling
  const fetchNotifications = async (showLoading = true) => {
    if (!user?.agentId) {
      console.log('❌ No agent ID found');
      setApiError('No agent ID found');
      return;
    }

    if (showLoading) setIsLoading(true);
    setApiError(null);

    try {
      const agentId = user.agentId;
      const url = `http://localhost:5000/agent-notifications/${agentId}`;
      console.log('🌐 Fetching from URL:', url);
      console.log('📋 Request details:', {
        method: 'GET',
        url: url,
        agentId: agentId,
        timestamp: new Date().toISOString()
      });

      const res = await axios.get(url, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('📦 Full Response:', {
        status: res.status,
        statusText: res.statusText,
        data: res.data,
        headers: res.headers
      });

      setLastFetch(new Date().toISOString());

      if (res.data.success && Array.isArray(res.data.notifications)) {
        const transformedNotifications = res.data.notifications.map(notif => ({
          ...notif,
          notificationType: notif.type || 'Updates',
          emailFrequency: 'Real-time',
          mobileNotifications: true,
          time: notif.createdAt
        }));
        console.log('✅ Transformed notifications:', transformedNotifications);
        setNotifications(transformedNotifications);
        setBadgeCount(res.data.count || 0);
      } else {
        console.log('⚠️ No notifications or invalid response structure');
        console.log('Response structure:', {
          hasSuccess: 'success' in res.data,
          successValue: res.data.success,
          hasNotifications: 'notifications' in res.data,
          notificationsType: typeof res.data.notifications,
          isArray: Array.isArray(res.data.notifications)
        });
        setNotifications([]);
        setBadgeCount(0);
      }
    } catch (err) {
      console.error('❌ Failed to load notifications:', err);
      console.error('❌ Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          timeout: err.config?.timeout
        }
      });

      setApiError(`Failed to load notifications: ${err.message}`);
      setNotifications([]);
      setBadgeCount(0);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  // First useEffect - Fetch notifications on component mount
  useEffect(() => {
    console.log('🔍 User object:', user);
    console.log('🔍 Agent ID:', user?.agentId);

    if (user?.agentId) {
      fetchNotifications();
    }
  }, [user?.agentId]);

  // Second useEffect - Socket listeners
  useEffect(() => {
    if (!user?.agentId || !socket) {
      console.log('❌ Missing user.agentId or socket:', {
        agentId: user?.agentId,
        socket: !!socket
      });
      return;
    }

    console.log('🔌 Setting up socket listeners for agent:', user.agentId);

    // Join agent-specific room
    socket.emit('join-agent-room', user.agentId);


    const handleNotification = (notification) => {
      console.log('📥 Received notification:', notification);
      if (notification.userId === user.agentId) {
        setNotifications(prev => [notification, ...prev]);
        setBadgeCount(prev => prev + 1);
      }
    };

    const handleNotificationRead = (data) => {
      console.log('👁️ Notification read:', data);
      if (data.userId === user.agentId) {
        setNotifications(prev =>
          prev.map(notif =>
            notif._id === data.notificationId
              ? { ...notif, isRead: true }
              : notif
          )
        );
        setBadgeCount(prev => Math.max(0, prev - 1));
      }
    };

    const handleNotificationDeleted = (data) => {
      console.log('🗑️ Notification deleted:', data);
      if (data.userId === user.agentId) {
        setNotifications(prev =>
          prev.filter(notif => notif._id !== data.notificationId)
        );
        setBadgeCount(prev => Math.max(0, prev - 1));
      }
    };

    // Add connection event listeners
    const handleConnect = () => {
      console.log('✅ Socket connected');
    };

    const handleDisconnect = () => {
      console.log('❌ Socket disconnected');
    };

    const handlePong = (data) => {
      console.log('🏓 Pong received:', data);
    };

    const handleRoomJoined = (data) => {
      console.log('🏠 Room joined:', data);
    };

    // Add all event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('pong', handlePong);
    socket.on('room-joined', handleRoomJoined);
    socket.on('notification', handleNotification);
    socket.on('notification-read', handleNotificationRead);
    socket.on('notification-deleted', handleNotificationDeleted);

    return () => {
      console.log('🧹 Cleaning up socket listeners');
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('pong', handlePong);
      socket.off('room-joined', handleRoomJoined);
      socket.off('notification', handleNotification);
      socket.off('notification-read', handleNotificationRead);
      socket.off('notification-deleted', handleNotificationDeleted);
    };
  }, [user?.agentId, socket]);

  const getGradient = (type) => {
    switch (type) {
      case 'Notes': return 'from-green-400 to-green-600';
      case 'Messages': return 'from-orange-400 to-orange-600';
      case 'Reminders': return 'from-purple-500 to-purple-700';
      case 'Updates': return 'from-blue-500 to-blue-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Notes': return <UserPlus className="text-white" size={16} />;
      case 'Messages':
      case 'Reminders': return <MessageSquare className="text-white" size={16} />;
      case 'Updates':
      default: return <Users className="text-white" size={16} />;
    }
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };


  return (
    <>
      <NotificationsNavbar user={user} badgeCount={badgeCount} />
      <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen p-6 flex justify-center">
        <div className="w-full max-w-5xl">

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>API Error:</strong> {apiError}
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading notifications...</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 items-stretch">
            {Array.isArray(notifications) && notifications.length > 0 ? (
              notifications.map((notif, index) => {
                const type = notif.notificationType || notif.type || 'Updates';
                const isRead = notif.isRead || false;
                return (
                  <motion.div
                    key={notif._id || notif.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative ${isRead ? 'bg-white/40' : 'bg-white/60'} backdrop-blur-lg border border-gray-200 rounded-md p-3 hover:shadow-xl transition-all duration-300 group min-h-[150px] h-[35vh] overflow-hidden flex flex-col`}
                  >
                    <button
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                      onClick={() => handleDelete(notif._id || notif.id)}
                    >
                      <X size={14} />
                    </button>
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className={`bg-gradient-to-br ${getGradient(type)} p-2 rounded-full`}>
                          {getIcon(type)}
                        </div>
                        {!isRead && (
                          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 border-2 border-white rounded-full animate-ping"></span>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                          🔔 {type} {isRead && <span className="text-green-500 text-xs">✓ Read</span>}
                        </h4>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          {notif.message || 'No message available'}
                        </p>
                        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                          <span className="font-medium text-gray-700 truncate">
                            Agent ID: {(notif.userId || user?.agentId || 'Unknown')?.slice?.(0, 6)}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span className="text-[10px]">
                              {format(notif.createdAt || notif.time || Date.now())}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 text-[11px] text-blue-500 cursor-pointer flex gap-3">
                      {!isRead && (
                        <span
                          className="hover:underline flex items-center gap-1"
                          onClick={() => handleMarkAsRead(notif._id || notif.id)}
                        >
                          <CheckCircle size={12} /> Mark as read
                        </span>
                      )}
                      <span className="hover:underline">Reply</span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-gray-600 col-span-2 text-center p-8">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
                <p className="text-sm text-gray-500">
                  You'll see notifications here when students are added or applications are submitted.
                </p>
                {!user?.agentId && (
                  <p className="text-red-500 text-sm mt-2">
                    ⚠️ Agent ID not found in user context
                  </p>
                )}
                {!socket?.connected && (
                  <p className="text-red-500 text-sm mt-2">
                    ⚠️ Socket not connected
                  </p>
                )}
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => fetchNotifications()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Refresh Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}