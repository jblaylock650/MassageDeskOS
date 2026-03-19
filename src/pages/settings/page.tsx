import { useState } from 'react';
import Header from '../../components/feature/Header';

type SettingsSection = 'account' | 'privacy' | 'notifications' | 'security' | 'display';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Account settings state
  const [fullName, setFullName] = useState('John Smith');
  const [email, setEmail] = useState('john.smith@email.com');
  const [bio, setBio] = useState('Licensed massage therapist and community builder');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Privacy settings state
  const [postVisibility, setPostVisibility] = useState('friends');
  const [friendRequestsFrom, setFriendRequestsFrom] = useState('everyone');
  const [profileVisibility, setProfileVisibility] = useState('friends');
  const [searchVisibility, setSearchVisibility] = useState(true);

  // Notification settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [friendRequestNotifications, setFriendRequestNotifications] = useState(true);

  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Display settings state
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleSaveChanges = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const activeSessions = [
    { id: 1, device: 'Chrome on Windows', location: 'New York, USA', lastActive: 'Active now', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'New York, USA', lastActive: '2 hours ago', current: false },
    { id: 3, device: 'Chrome on MacBook', location: 'New York, USA', lastActive: '1 day ago', current: false },
  ];

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
        <p className="text-sm text-gray-500">Manage your account information and preferences</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Linked Accounts</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Google</p>
              <p className="text-sm text-gray-500">Connected</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
            Disconnect
          </button>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-amber-600 transition-all cursor-pointer whitespace-nowrap"
      >
        Save Changes
      </button>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy Settings</h2>
        <p className="text-sm text-gray-500">Control who can see your content and interact with you</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Post Privacy</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your posts?</label>
            <select
              value={postVisibility}
              onChange={(e) => setPostVisibility(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="only-me">Only Me</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can send you friend requests?</label>
            <select
              value={friendRequestsFrom}
              onChange={(e) => setFriendRequestsFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              <option value="everyone">Everyone</option>
              <option value="friends-of-friends">Friends of Friends</option>
              <option value="no-one">No One</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="only-me">Only Me</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Search Engine Visibility</p>
              <p className="text-sm text-gray-500">Allow search engines to link to your profile</p>
            </div>
            <button
              onClick={() => setSearchVisibility(!searchVisibility)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${searchVisibility ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${searchVisibility ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Blocking</h3>
        <p className="text-sm text-gray-500 mb-4">Manage blocked users and pages</p>
        <button className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
          Manage Blocked List
        </button>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-amber-600 transition-all cursor-pointer whitespace-nowrap"
      >
        Save Changes
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
        <p className="text-sm text-gray-500">Choose what notifications you want to receive</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Enable Push Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications on your device</p>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${pushNotifications ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${pushNotifications ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Message Notifications</p>
              <p className="text-sm text-gray-500">Get notified when you receive messages</p>
            </div>
            <button
              onClick={() => setMessageNotifications(!messageNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${messageNotifications ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${messageNotifications ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Comment Notifications</p>
              <p className="text-sm text-gray-500">Get notified when someone comments on your posts</p>
            </div>
            <button
              onClick={() => setCommentNotifications(!commentNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${commentNotifications ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${commentNotifications ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Friend Request Notifications</p>
              <p className="text-sm text-gray-500">Get notified about new friend requests</p>
            </div>
            <button
              onClick={() => setFriendRequestNotifications(!friendRequestNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${friendRequestNotifications ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${friendRequestNotifications ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Enable Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${emailNotifications ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${emailNotifications ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Sound Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notification Sounds</p>
              <p className="text-sm text-gray-500">Play sound for notifications</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${soundEnabled ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-amber-600 transition-all cursor-pointer whitespace-nowrap"
      >
        Save Changes
      </button>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
        <p className="text-sm text-gray-500">Keep your account secure</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Enable Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${twoFactorEnabled ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${twoFactorEnabled ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Login Alerts</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Get Alerts About Unrecognized Logins</p>
              <p className="text-sm text-gray-500">We'll notify you if someone logs in from a new device</p>
            </div>
            <button
              onClick={() => setLoginAlerts(!loginAlerts)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${loginAlerts ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${loginAlerts ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
        <p className="text-sm text-gray-500 mb-4">Manage devices where you're logged in</p>
        
        <div className="space-y-3">
          {activeSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <i className={`${session.device.includes('iPhone') ? 'ri-smartphone-line' : 'ri-computer-line'} text-xl text-gray-700`}></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{session.device}</p>
                  <p className="text-xs text-gray-500">{session.location} · {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                  Log Out
                </button>
              )}
              {session.current && (
                <span className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg whitespace-nowrap">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-amber-600 transition-all cursor-pointer whitespace-nowrap"
      >
        Save Changes
      </button>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Display &amp; Accessibility</h2>
        <p className="text-sm text-gray-500">Customize how TheraLinkNetwork looks and feels</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-500">Switch to dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${darkMode ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Language</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-rose-200">
        <h3 className="text-lg font-semibold mb-2 text-rose-600">Danger Zone</h3>
        <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data</p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Delete Account
        </button>
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-amber-600 transition-all cursor-pointer whitespace-nowrap"
      >
        Save Changes
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Settings</h2>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveSection('account')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors text-left ${activeSection === 'account' ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeSection === 'account' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-100'}`}>
                      <i className={`ri-user-line text-lg ${activeSection === 'account' ? 'text-white' : 'text-gray-700'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Account</p>
                      <p className="text-xs text-gray-500">Profile and password</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('privacy')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors text-left ${activeSection === 'privacy' ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeSection === 'privacy' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-100'}`}>
                      <i className={`ri-lock-line text-lg ${activeSection === 'privacy' ? 'text-white' : 'text-gray-700'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Privacy</p>
                      <p className="text-xs text-gray-500">Control your visibility</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('notifications')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors text-left ${activeSection === 'notifications' ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeSection === 'notifications' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-100'}`}>
                      <i className={`ri-notification-3-line text-lg ${activeSection === 'notifications' ? 'text-white' : 'text-gray-700'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Notifications</p>
                      <p className="text-xs text-gray-500">Manage alerts</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('security')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors text-left ${activeSection === 'security' ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeSection === 'security' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-100'}`}>
                      <i className={`ri-shield-check-line text-lg ${activeSection === 'security' ? 'text-white' : 'text-gray-700'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Security</p>
                      <p className="text-xs text-gray-500">Login and sessions</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('display')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors text-left ${activeSection === 'display' ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeSection === 'display' ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gray-100'}`}>
                      <i className={`ri-palette-line text-lg ${activeSection === 'display' ? 'text-white' : 'text-gray-700'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Display</p>
                      <p className="text-xs text-gray-500">Theme and language</p>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeSection === 'account' && renderAccountSettings()}
              {activeSection === 'privacy' && renderPrivacySettings()}
              {activeSection === 'notifications' && renderNotificationSettings()}
              {activeSection === 'security' && renderSecuritySettings()}
              {activeSection === 'display' && renderDisplaySettings()}
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-8 right-8 bg-white shadow-xl rounded-lg p-4 flex items-center gap-3 border border-gray-100 z-50 animate-slide-up">
          <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center">
            <i className="ri-check-line text-white text-xl"></i>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Changes Saved!</p>
            <p className="text-sm text-gray-500">Your settings have been updated</p>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-rose-600"></i>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Delete Account?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. All your data, posts, and connections will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  // Handle account deletion
                }}
                className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
