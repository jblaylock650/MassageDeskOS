
import { useState } from 'react';
import { friendRequests as initialRequests } from '../../../mocks/friendsData';

export default function FriendRequests() {
  const [requests, setRequests] = useState(initialRequests);

  // Accept a request – remove it from the list.
  const handleAccept = (id) => {
    if (typeof id !== 'number') {
      console.error('handleAccept expects a numeric id');
      return;
    }
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  // Decline a request – also remove it from the list.
  const handleDecline = (id) => {
    if (typeof id !== 'number') {
      console.error('handleDecline expects a numeric id');
      return;
    }
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  if (!Array.isArray(requests) || requests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
          <i className="ri-user-add-line text-4xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No friend requests</h3>
        <p className="text-sm text-gray-500">
          When people send you friend requests, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Friend Requests ({requests.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={request.avatar}
              alt={request.name}
              className="w-full h-48 object-cover object-top"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{request.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {request.mutualFriends} mutual friends
              </p>
              <p className="text-xs text-gray-400 mb-3">{request.time}</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-rose-600 hover:to-amber-600 transition-all whitespace-nowrap cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleDecline(request.id)}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
