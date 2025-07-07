import { useContext, useEffect } from 'react';
import { X, Clock, UserPlus, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'timeago.js';
import NotificationsNavbar from '../layouts/NotificationsNavbar';
import { UserContext } from '../context/userContext';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

export default function Notification() {
  const { user } = useContext(UserContext);
  const {
    notifications,
    setNotifications,
    badgeCount,
    setBadgeCount,
    deleteNotification,
    markAsRead,
  } = useSocket();

  // 🟢 Load backend notifications on first render
  useEffect(() => {
    console.log('🔍 User object:', user);
    console.log('🔍 Agent ID:', user?.agentId);
    
    if (!user?.agentId) {
      console.log('❌ No agent ID found');
      return;
    }

    const fetchNotifications = async () => {
      try {
        const agentId = user.agentId;
        const url = `http://localhost:5000/agent-notifications/${agentId}`;
        console.log('🌐 Fetching from URL:', url);
        
        const res = await axios.get(url);
        console.log('📦 Response:', res.data);
        
        if (res.data.success && Array.isArray(res.data.notifications)) {
          // Transform backend data to match frontend format
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
          setNotifications([]);
          setBadgeCount(0);
        }
      } catch (err) {
        console.error('❌ Failed to load notifications:', err);
        console.error('❌ Error details:', err.response?.data);
        setNotifications([]);
        setBadgeCount(0);
      }
    };

    fetchNotifications();
  }, [user?.agentId, setNotifications, setBadgeCount]);

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

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };

  // Debug info display
  const debugInfo = (
    <div className="bg-yellow-100 border border-yellow-400 rounded p-4 mb-4">
      <h4 className="font-bold text-yellow-800">Debug Info:</h4>
      <p><strong>User:</strong> {JSON.stringify(user, null, 2)}</p>
      <p><strong>Agent ID:</strong> {user?.agentId || 'NOT FOUND'}</p>
      <p><strong>Notifications Count:</strong> {notifications?.length || 0}</p>
      <p><strong>Badge Count:</strong> {badgeCount}</p>
    </div>
  );

  return (
    <>
      <NotificationsNavbar user={user} badgeCount={badgeCount} />

      <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen p-6 flex justify-center">
        <div className="w-full max-w-5xl">
          
          {/* Debug Info - Remove this in production */}
          {debugInfo}
          
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
                          <CheckCircle size={12} />
                          Mark as read
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}