import { useContext, useEffect, useState } from 'react';
import { X, Clock, UserPlus, MessageSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'timeago.js';
import NotificationsNavbar from '../layouts/NotificationsNavbar';
import { UserContext } from '../context/userContext';
import axios from 'axios';

export default function Notification() {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    if (user?.agentId) {
      // Fetch notifications
      axios
        .get(`http://localhost:5000/notification/notification-preferences/${user.agentId}`)
        .then((res) => {
          if (Array.isArray(res.data?.preferences)) {
            setNotifications(res.data.preferences);
          } else {
            console.warn('Unexpected notifications data:', res.data);
            setNotifications([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching notifications:', err);
          setNotifications([]);
        });

      // Fetch badge count
      axios
        .get(`http://localhost:5000/notification/notification-preferences/${user.agentId}`)
        .then((res) => {
          setBadgeCount(res.data?.count || 0);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            console.warn('Count route not found. Ensure it exists on backend.');
          }
          console.error('Error fetching badge count:', err);
          setBadgeCount(0);
        });
    }
  }, [user]);

  const getGradient = (type) => {
    switch (type) {
      case 'Notes':
        return 'from-green-400 to-green-600';
      case 'Messages':
        return 'from-orange-400 to-orange-600';
      case 'Reminders':
        return 'from-purple-500 to-purple-700';
      case 'Updates':
        return 'from-blue-500 to-blue-700';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Notes':
        return <UserPlus className="text-white" size={16} />;
      case 'Messages':
      case 'Reminders':
        return <MessageSquare className="text-white" size={16} />;
      case 'Updates':
      default:
        return <Users className="text-white" size={16} />;
    }
  };

  return (
    <>
      <NotificationsNavbar user={user} badgeCount={badgeCount} />

      <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen p-6 flex justify-center">
        <div className="w-full max-w-5xl grid gap-4 sm:grid-cols-2 items-stretch">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white/60 backdrop-blur-lg border border-gray-200 rounded-md p-3 hover:shadow-xl transition-all duration-300 group min-h-[150px] h-[35vh] overflow-hidden flex flex-col"
              >
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
                  <X size={14} />
                </button>

                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${getGradient(notif.notificationType)} p-2 rounded-full`}>
                      {getIcon(notif.notificationType)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 border-2 border-white rounded-full animate-ping"></span>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                      🔔 {notif.notificationType}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      📧 <strong>Email Frequency:</strong> {notif.emailFrequency}
                    </p>
                    <p className="text-xs text-gray-600">
                      📱 <strong>Mobile Notifications:</strong> {notif.mobileNotifications ? 'Enabled' : 'Disabled'}
                    </p>

                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span className="font-medium text-gray-700 truncate">
                        User ID: {notif.userId?.slice(0, 6)}...
                      </span>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span className="text-[10px]">{format(notif.createdAt || Date.now())}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-4 group-hover:opacity-100 transition duration-300 text-[11px] text-blue-500 cursor-pointer flex gap-3">
                  <span className="hover:underline">Mark as read</span>
                  <span className="hover:underline">Reply</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-gray-600 col-span-2 text-center p-4">
              No notifications available.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
