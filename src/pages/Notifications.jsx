import { useContext, useEffect, useState } from 'react';
import { X, Clock, UserPlus, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'timeago.js';
import NotificationsNavbar from '../layouts/NotificationsNavbar';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';

export default function Notification() {
  const { user } = useContext(UserContext);
  const {
    notifications,
    setNotifications,
    badgeCount,
    setBadgeCount,
    deleteNotification,
    markAsRead,
    socket
  } = useSocket();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchNotifications = async (showLoading = true) => {
    if (!user?.agentId) {
      setApiError('No agent ID found');
      return;
    }

    if (showLoading) setIsLoading(true);
    setApiError(null);

    try {
      const res = await axios.get(
        `http://localhost:5000/agent-notifications/${user.agentId}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setLastFetch(new Date().toISOString());

      if (res.data.success && Array.isArray(res.data.notifications)) {
        const transformed = res.data.notifications.map(n => ({
          ...n,
          notificationType: n.type || 'Updates',
          emailFrequency: 'Real-time',
          mobileNotifications: true,
          time: n.createdAt,
        }));
        setNotifications(transformed);
        setBadgeCount(res.data.count || 0);
      } else {
        setNotifications([]);
        setBadgeCount(0);
      }
    } catch (err) {
      setApiError(`Failed to load notifications: ${err.message}`);
      setNotifications([]);
      setBadgeCount(0);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.agentId) fetchNotifications();
  }, [user?.agentId]);

  // 👇 Auto-mark unread notifications as read on mount
  useEffect(() => {
    const unread = notifications.filter(n => !n.isRead);
    unread.forEach(n => {
      markAsRead(n._id || n.id);
    });
  }, [notifications]);

  // Socket setup
  useEffect(() => {
    if (!user?.agentId || !socket) return;

    socket.emit('join-agent-room', user.agentId);

    const handleNotification = (notification) => {
      if (!notification?.message) return;

      if (notification.userId === user.agentId) {
        const transformed = {
          _id: `live-${Date.now()}`,
          message: notification.message,
          type: notification.type || 'Login',
          notificationType: notification.type || 'Updates',
          userId: notification.userId,
          emailFrequency: 'Real-time',
          mobileNotifications: true,
          createdAt: notification.createdAt || new Date().toISOString(),
          isRead: false,
        };
        setNotifications(prev => [transformed, ...prev]);
        setBadgeCount(prev => prev + 1);
      }
    };

    const handleNotificationRead = (data) => {
      if (data.userId === user.agentId) {
        setNotifications(prev =>
          prev.map(n => (n._id === data.notificationId ? { ...n, isRead: true } : n))
        );
        setBadgeCount(prev => Math.max(0, prev - 1));
      }
    };

    const handleNotificationDeleted = (data) => {
      if (data.userId === user.agentId) {
        setNotifications(prev => prev.filter(n => n._id !== data.notificationId));
        setBadgeCount(prev => Math.max(0, prev - 1));
      }
    };

    socket.on('notification', handleNotification);
    socket.on('notification-read', handleNotificationRead);
    socket.on('notification-deleted', handleNotificationDeleted);

    return () => {
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
            {notifications.length > 0 ? (
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
                        <span className="hover:underline flex items-center gap-1">
                          <CheckCircle size={12} /> Marked as read
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
