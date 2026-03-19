
import { useState } from 'react';
import { allFriends as initialFriends } from '../../../mocks/friendsData';

type SortType = 'recent' | 'name';

export default function AllFriends() {
  const [friends, setFriends] = useState(initialFriends);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('recent');
  const [showUnfriendModal, setShowUnfriendModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  /** Open the confirmation modal for the chosen friend */
  const handleUnfriend = (id: number) => {
    setSelectedFriend(id);
    setShowUnfriendModal(true);
  };

  /** Remove the selected friend from the list */
  const confirmUnfriend = () => {
    if (selectedFriend !== null) {
      setFriends((prev) => prev.filter((friend) => friend.id !== selectedFriend));
      setShowUnfriendModal(false);
      setSelectedFriend(null);
    }
  };

  /** Filter and sort the friends list based on UI controls */
  const filteredFriends = friends
    .filter((friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // For 'recent' we keep the original order (assuming initial order is recent‑first)
      return 0;
    });

  return (
    <div>
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-gray-400 text-sm"></i>
          </div>
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortType)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm cursor-pointer"
        >
          <option value="recent">Recently Added</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Friends Count */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {filteredFriends.length} Friends
      </h2>

      {/* Friends Grid */}
      {filteredFriends.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
            <i className="ri-user-line text-4xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No friends found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-full h-48 object-cover object-top"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{friend.name}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {friend.mutualFriends} mutual friends
                </p>
                <p className="text-xs text-gray-400 mb-3">{friend.friendsSince}</p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      // Assuming a global navigation helper; replace with your router logic if needed
                      if (typeof window.REACT_APP_NAVIGATE === 'function') {
                        window.REACT_APP_NAVIGATE('/messages');
                      } else {
                        console.warn('Navigation function not available');
                      }
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                  >
                    <i className="ri-message-3-line text-sm"></i>
                    Message
                  </button>
                  <button
                    onClick={() => handleUnfriend(friend.id)}
                    className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Unfriend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Unfriend Confirmation Modal */}
      {showUnfriendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unfriend?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this person from your friends list?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUnfriendModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmUnfriend}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-amber-600 transition-all whitespace-nowrap cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
