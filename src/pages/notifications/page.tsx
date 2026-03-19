
import { useState } from 'react';
import Header from '../../components/feature/Header';
import { notificationsData } from '../../mocks/notificationsData';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTimeGroup = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hour = 3600000;
    if (diff < hour) return 'New';
    if (diff < 24 * hour) return 'Today';
    if (diff < 48 * hour) return 'Yesterday';
    return 'Earlier';
  };

  const grouped: Record<string, typeof notifications> = {};
  filtered.forEach(n => {
    const group = getTimeGroup(n.timestamp);
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(n);
  });

  const groupOrder = ['New', 'Today', 'Yesterday', 'Earlier'];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-14 max-w-2xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">You have <span className="font-semibold text-rose-500">{unreadCount}</span> unread notifications</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-rose-500 hover:text-rose-600 cursor-pointer whitespace-nowrap"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all' ? 'bg-rose-100 text-rose-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'unread' ? 'bg-rose-100 text-rose-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {/* Notification Groups */}
        {groupOrder.map(group => {
          const items = grouped[group];
          if (!items || items.length === 0) return null;
          return (
            <div key={group} className="mb-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2 px-1">{group}</h3>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {items.map((notif, idx) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      !notif.read ? 'bg-rose-50/40' : ''
                    } ${idx < items.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="relative flex-shrink-0">
                      <img src={notif.user.avatar} alt={notif.user.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${notif.iconBg} rounded-full flex items-center justify-center ring-2 ring-white`}>
                        <i className={`${notif.icon} ${notif.iconColor} text-xs`}></i>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 leading-snug">
                        <span className="font-semibold">{notif.user.name}</span>{' '}
                        {notif.action}
                      </p>
                      {notif.target && (
                        <p className="text-sm text-gray-500 mt-0.5 truncate">{notif.target}</p>
                      )}
                      <p className={`text-xs mt-1 ${!notif.read ? 'text-rose-500 font-medium' : 'text-gray-400'}`}>
                        {notif.time}
                      </p>

                      {/* Action buttons for friend requests */}
                      {notif.type === 'friend_request' && !notif.read && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                            className="px-4 py-1.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-semibold rounded-lg hover:from-rose-600 hover:to-amber-600 cursor-pointer whitespace-nowrap"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                            className="px-4 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-300 cursor-pointer whitespace-nowrap"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {/* Action for event invites */}
                      {notif.type === 'event' && !notif.read && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                            className="px-4 py-1.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-semibold rounded-lg hover:from-rose-600 hover:to-amber-600 cursor-pointer whitespace-nowrap"
                          >
                            Interested
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                            className="px-4 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-300 cursor-pointer whitespace-nowrap"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notif.read && (
                        <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
                      )}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer opacity-0 group-hover:opacity-100"
                      >
                        <i className="ri-more-fill text-gray-400"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-notification-off-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No notifications</h3>
            <p className="text-sm text-gray-500">
              {filter === 'unread' ? 'You\u2019re all caught up!' : 'When you get notifications, they\u2019ll show up here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
