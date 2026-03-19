
import { useState } from 'react';
import { friendSuggestions as initialSuggestions } from '../../../mocks/friendsData';

export default function FriendSuggestions() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  // Remove TypeScript type annotations for plain JavaScript/JSX files
  const handleAddFriend = (id) => {
    setSuggestions((prev) => prev.filter((sug) => sug.id !== id));
  };

  const handleRemove = (id) => {
    setSuggestions((prev) => prev.filter((sug) => sug.id !== id));
  };

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
          <i className="ri-user-search-line text-4xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions available</h3>
        <p className="text-sm text-gray-500">
          Check back later for new friend suggestions.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        People You May Know
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={suggestion.avatar}
              alt={suggestion.name}
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {suggestion.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {suggestion.mutualFriends} mutual friends
              </p>
              <p className="text-xs text-gray-400 mb-3">{suggestion.reason}</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAddFriend(suggestion.id)}
                  className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-rose-600 hover:to-amber-600 transition-all whitespace-nowrap cursor-pointer"
                >
                  Add Friend
                </button>
                <button
                  onClick={() => handleRemove(suggestion.id)}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
