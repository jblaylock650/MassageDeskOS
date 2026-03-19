
import { useState, useEffect, useCallback } from 'react';

interface ToastNotification {
  id: number;
  user: { name: string; avatar: string };
  action: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

interface NotificationToastProps {
  notifications: ToastNotification[];
  onDismiss: (id: number) => void;
}

export default function NotificationToast({ notifications, onDismiss }: NotificationToastProps) {
  return (
    <div className="fixed top-16 right-4 z-[60] flex flex-col gap-2 w-80">
      {notifications.map(notif => (
        <ToastItem key={notif.id} notification={notif} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ notification, onDismiss }: { notification: ToastNotification; onDismiss: (id: number) => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const dismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onDismiss(notification.id), 300);
  }, [notification.id, onDismiss]);

  useEffect(() => {
    const timer = setTimeout(dismiss, 5000);
    return () => clearTimeout(timer);
  }, [dismiss]);

  return (
    <div
      className={`bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
        isExiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0 animate-[slideInRight_0.3s_ease-out]'
      }`}
      onClick={dismiss}
    >
      <div className="relative flex-shrink-0">
        <img src={notification.user.avatar} alt={notification.user.name} className="w-10 h-10 rounded-full object-cover" />
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${notification.iconBg} rounded-full flex items-center justify-center ring-2 ring-white`}>
          <i className={`${notification.icon} ${notification.iconColor} text-xs`}></i>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 leading-tight">
          <span className="font-semibold">{notification.user.name}</span>{' '}
          <span className="text-gray-600">{notification.action}</span>
        </p>
        <p className="text-xs text-rose-500 font-medium mt-0.5">Just now</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); dismiss(); }}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 flex-shrink-0 cursor-pointer"
      >
        <i className="ri-close-line text-gray-400 text-sm"></i>
      </button>
    </div>
  );
}
