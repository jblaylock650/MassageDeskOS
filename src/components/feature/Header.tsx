
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // added navigation hook
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const messengerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (messengerRef.current && !messengerRef.current.contains(e.target as Node)) {
        setShowMessenger(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      user: 'Sarah Chen, LMT',
      action: 'commented on your CE workshop post',
      time: '2m',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20asian%20woman%20massage%20therapist%20smiling%20warmly%20wearing%20scrubs%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt1&orientation=squarish',
      unread: true,
    },
    {
      id: 2,
      user: 'Marcus Johnson, CMT',
      action: 'sent you a connection request',
      time: '15m',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20african%20american%20male%20massage%20therapist%20friendly%20expression%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt2&orientation=squarish',
      unread: true,
    },
    {
      id: 3,
      user: 'Deep Tissue Workshop',
      action: 'is happening in 3 days - 6 CE credits',
      time: '1h',
      avatar:
        'https://readdy.ai/api/search-image?query=massage%20therapy%20workshop%20icon%20with%20hands%20and%20certificate%20modern%20design%20teal%20color&width=100&height=100&seq=evicon&orientation=squarish',
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      user: 'David Kim, NCTMB',
      message: 'Hey! Are you going to the networking mixer this weekend?',
      time: '5m',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20korean%20american%20male%20massage%20therapist%20casual%20style%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt4&orientation=squarish',
      unread: true,
    },
    {
      id: 2,
      user: 'Lisa Thompson, LMT',
      message: 'Thanks for the myofascial tips!',
      time: '30m',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20woman%20massage%20therapist%20with%20glasses%20friendly%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt5&orientation=squarish',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm z-50 font-sans">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-2" ref={searchRef}>
          <Link to="/feed" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <i className="ri-hand-heart-line text-white text-lg"></i>
            </div>
          </Link>

          <div className="relative">
            {showSearch ? (
              <div className="absolute left-0 top-0 bg-white shadow-lg rounded-xl p-2 w-72 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setShowSearch(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="ri-arrow-left-line text-xl"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="Search therapists, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                    autoFocus
                  />
                </div>
                <div className="text-sm text-gray-500 px-2 py-3">No recent searches</div>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 hover:bg-gray-200 cursor-pointer transition-colors"
              >
                <i className="ri-search-line text-gray-500"></i>
                <span className="text-gray-500 text-sm hidden lg:block">Search TheraLinkNetwork</span>
              </button>
            )}
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Link
            to="/feed"
            className={`w-24 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
              isActive('/feed')
                ? 'text-teal-500 border-b-4 border-teal-500 rounded-none'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <i className={`ri-home-${isActive('/feed') ? 'fill' : 'line'} text-2xl`}></i>
          </Link>
          <Link
            to="/friends"
            className={`w-24 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
              isActive('/friends')
                ? 'text-teal-500 border-b-4 border-teal-500 rounded-none'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <i className={`ri-user-heart-${isActive('/friends') ? 'fill' : 'line'} text-2xl`}></i>
          </Link>
          <Link
            to="/events"
            className={`w-24 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
              isActive('/events')
                ? 'text-teal-500 border-b-4 border-teal-500 rounded-none'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <i className={`ri-calendar-event-${isActive('/events') ? 'fill' : 'line'} text-2xl`}></i>
          </Link>
          <Link
            to="/groups"
            className={`w-24 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
              isActive('/groups')
                ? 'text-teal-500 border-b-4 border-teal-500 rounded-none'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <i className={`ri-group-${isActive('/groups') ? 'fill' : 'line'} text-2xl`}></i>
          </Link>
          <Link
            to="/marketplace"
            className={`w-24 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
              isActive('/marketplace')
                ? 'text-teal-500 border-b-4 border-teal-500 rounded-none'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <i className={`ri-store-2-${isActive('/marketplace') ? 'fill' : 'line'} text-2xl`}></i>
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">
            <i className="ri-apps-2-line text-xl"></i>
          </button>

          {/* Messenger */}
          <div className="relative" ref={messengerRef}>
            <button
              onClick={() => {
                setShowMessenger(!showMessenger);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <i className="ri-messenger-line text-xl text-gray-700"></i>
              <span className="absolute top-0 right-0 w-5 h-5 bg-teal-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {showMessenger && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Messages</h3>
                  <button
                    onClick={() => navigate('/messages')} // fixed navigation
                    className="text-teal-500 hover:text-teal-600 text-sm font-semibold cursor-pointer whitespace-nowrap"
                  >
                    See all
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="relative flex-shrink-0">
                        <img src={msg.avatar} alt={msg.user} className="w-12 h-12 rounded-full object-cover" />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${msg.unread ? 'font-semibold' : ''}`}>{msg.user}</p>
                        <p className={`text-xs truncate ${msg.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {msg.message} · {msg.time}
                        </p>
                      </div>
                      {msg.unread && <span className="w-3 h-3 bg-teal-500 rounded-full flex-shrink-0"></span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessenger(false);
                setShowProfile(false);
              }}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer relative transition-colors"
            >
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Notifications</h3>
                    <button className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                      <i className="ri-more-fill"></i>
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notif.unread ? 'bg-teal-50/50' : ''
                      }`}
                    >
                      <img src={notif.avatar} alt={notif.user} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notif.user}</span> {notif.action}
                        </p>
                        <p className={`text-xs ${notif.unread ? 'text-teal-500 font-medium' : 'text-gray-500'}`}>{notif.time}</p>
                      </div>
                      {notif.unread && <span className="w-3 h-3 bg-teal-500 rounded-full flex-shrink-0"></span>}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-teal-500 text-sm font-medium hover:underline cursor-pointer"
                  >
                    See all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMessenger(false);
                setShowNotifications(false);
              }}
              className="cursor-pointer"
            >
              <img
                src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20male%20massage%20therapist%20in%20his%2030s%20friendly%20smile%20wearing%20scrubs%20clean%20white%20background%20portrait%20photography&width=100&height=100&seq=mt10&orientation=squarish"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-teal-200 transition-all"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100">
                <div className="p-3">
                  <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                    <img
                      src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20male%20massage%20therapist%20in%20his%2030s%20friendly%20smile%20wearing%20scrubs%20clean%20white%20background%20portrait%20photography&width=100&height=100&seq=mt10&orientation=squarish"
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">John Smith, LMT</p>
                      <p className="text-xs text-gray-500">See your profile</p>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-gray-100 p-2">
                  <Link
                    to="/profile/edit"
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer text-left transition-colors"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-pencil-line text-lg"></i>
                    </div>
                    <span className="font-medium text-sm">Edit Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer text-left transition-colors"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-settings-3-line text-lg"></i>
                    </div>
                    <span className="font-medium text-sm">Settings &amp; privacy</span>
                    <i className="ri-arrow-right-s-line ml-auto text-gray-400"></i>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer text-left transition-colors">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-question-line text-lg"></i>
                    </div>
                    <span className="font-medium text-sm">Help &amp; support</span>
                    <i className="ri-arrow-right-s-line ml-auto text-gray-400"></i>
                  </button>
                  <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer text-left transition-colors">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-moon-line text-lg"></i>
                    </div>
                    <span className="font-medium text-sm">Display &amp; accessibility</span>
                    <i className="ri-arrow-right-s-line ml-auto text-gray-400"></i>
                  </button>
                  <Link
                    to="/"
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer text-left transition-colors"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-logout-box-r-line text-lg"></i>
                    </div>
                    <span className="font-medium text-sm">Log out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
