
import { useState } from 'react';
import Header from '../../components/feature/Header';
import FriendRequests from './components/FriendRequests';
import FriendSuggestions from './components/FriendSuggestions';
import AllFriends from './components/AllFriends';

type TabType = 'requests' | 'suggestions' | 'all';

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'requests'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Friend Requests
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'suggestions'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Suggestions
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'all'
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Friends
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'requests' && <FriendRequests />}
            {activeTab === 'suggestions' && <FriendSuggestions />}
            {activeTab === 'all' && <AllFriends />}
          </div>
        </div>
      </div>
    </div>
  );
}
