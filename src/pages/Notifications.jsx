import { useContext } from 'react';
import { X, Clock, UserPlus, MessageSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'timeago.js';
import NotificationsNavbar from '../layouts/NotificationsNavbar';
import { UserContext } from '../context/userContext';

export default function Notification() {
  const { user } = useContext(UserContext);

  const notifications = [
    {
      id: 1,
      type: 'joined',
      title: 'New user registration',
      description: 'Alfen Deu has just joined your workspace.',
      user: 'Alfen Deu',
      time: '2025-05-04T13:30:00Z'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from Darren',
      description: 'Hey, are we still on for the project deadline?',
      user: 'Darren Smith',
      time: '2025-05-04T14:30:00Z'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on your post',
      description: 'Arin commented: “This is super helpful, thanks!”',
      user: 'Arin Gansihram',
      time: '2025-05-04T15:00:00Z'
    },
    {
      id: 4,
      type: 'connect',
      title: 'New connection',
      description: 'Jullet Den connected with you.',
      user: 'Jullet Den',
      time: '2025-05-04T16:00:00Z'
    }
  ];

  const getGradient = (type) => {
    switch (type) {
      case 'joined': return 'from-green-400 to-green-600';
      case 'message': return 'from-orange-400 to-orange-600';
      case 'comment': return 'from-purple-500 to-purple-700';
      case 'connect': return 'from-blue-500 to-blue-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'joined': return <UserPlus className="text-white" size={16} />;
      case 'message': return <MessageSquare className="text-white" size={16} />;
      case 'comment': return <MessageSquare className="text-white" size={16} />;
      case 'connect': return <Users className="text-white" size={16} />;
      default: return <Users className="text-white" size={16} />;
    }
  };

  return (
    <>
      <NotificationsNavbar user={user} />
      <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen p-6 flex justify-center">
  <div className="w-full max-w-5xl grid gap-4 sm:grid-cols-2 items-stretch">
    {notifications.map((notif, index) => (
      <motion.div
        key={notif.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative bg-white/60 backdrop-blur-lg border border-gray-200 rounded-md p-3 hover:shadow-xl transition-all duration-300 group min-h-[150px] h-[35vh] overflow-hidden flex flex-col"
      >
        {/* Dismiss Button */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
          <X size={14} />
        </button>

        <div className="flex items-start space-x-3">
          <div className="relative">
            <div className={`bg-gradient-to-br ${getGradient(notif.type)} p-2 rounded-full`}>
              {getIcon(notif.type)}
            </div>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 border-2 border-white rounded-full animate-ping"></span>
          </div>

          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-gray-800 leading-tight truncate">
              {notif.title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-1">{notif.description}</p>

            <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700 truncate">{notif.user}</span>
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span className="text-[10px]">{format(notif.time)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-4 group-hover:opacity-100 transition duration-300 text-[11px] text-blue-500 cursor-pointer flex gap-3">
          <span className="hover:underline">Mark as read</span>
          <span className="hover:underline">Reply</span>
        </div>
      </motion.div>
    ))}
  </div>
</div>


    </>
  );
}
