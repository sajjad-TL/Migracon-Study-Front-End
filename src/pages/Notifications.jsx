import { useContext } from 'react';
import { X, Clock } from 'lucide-react';
import NotificationsNavbar from '../layouts/NotificationsNavbar';
import { UserContext } from '../context/userContext';

export default function Notification() {

  const { user } = useContext(UserContext);

  const notifications = [
    {
      id: 1,
      type: 'joined',
      title: 'New Registration: Finibus Bonorum et Malorum',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      user: 'Alfen Deu',
      time: '24 Nov 2018 at 9:30 AM'
    },
    {
      id: 2,
      type: 'message',
      title: 'Darren Smith sent new message',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      user: 'Darren',
      time: '24 Nov 2018 at 9:30 AM'
    },
    {
      id: 3,
      type: 'comment',
      title: 'Arin Gansihram Commented on post',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      user: 'Arin Gansihram',
      time: '24 Nov 2018 at 9:30 AM'
    },
    {
      id: 4,
      type: 'connect',
      title: 'Jullet Den Connect Alfen Depk',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      user: 'Jullet Den',
      time: '24 Nov 2018 at 9:30 AM'
    },
    {
      id: 5,
      type: 'connect',
      title: 'Jullet Den Connect Alfen Depk',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      user: 'Jullet Den',
      time: '24 Nov 2018 at 9:30 AM'
    },
    {
      id: 6,
      type: 'message',
      title: 'Darren Smith sent new message',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      user: 'Jullet Den',
      time: '24 Nov 2018 at 9:30 AM'
    }
  ];

  const getBadgeColor = (type) => {
    switch (type) {
      case 'joined':
        return 'bg-green-500';
      case 'message':
        return 'bg-orange-500';
      case 'comment':
        return 'bg-purple-600';
      case 'connect':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getNotificationLabel = (type) => {
    switch (type) {
      case 'joined':
        return 'Joined New User';
      case 'message':
        return 'Message';
      case 'comment':
        return 'Comment';
      case 'connect':
        return 'Connect';
      default:
        return 'Notification';
    }
  };

  return (
    <>
      <NotificationsNavbar user={user} />

      <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">

        <div className="bg-white rounded-lg shadow-md w-full max-w-10xl">
          {notifications.map((notification) => (
            <div key={notification.id} className="border-b border-gray-200 p- relative mb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className={`text-xs text-white px-2 py-1 rounded ${getBadgeColor(notification.type)}`}>
                      {getNotificationLabel(notification.type)}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                  <p className="text-sm text-red-600 mt-2">{notification.user}</p>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">{notification.time}</span>
                </div>
              </div>
              <button className="absolute top-4 left-0 bg-gray-200 rounded-full p-1">
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}