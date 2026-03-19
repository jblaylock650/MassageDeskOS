import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import { profileUser, profilePhotos, profileFriends, profilePosts } from '../../mocks/profileData';
import { currentUser } from '../../mocks/feedData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'about', label: 'About' },
    { id: 'friends', label: 'Friends' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'checkins', label: 'Check-ins' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="pt-14">
        {/* Cover Photo & Profile Info */}
        <div className="bg-white shadow">
          <div className="max-w-5xl mx-auto">
            {/* Cover Photo */}
            <div className="relative h-80 rounded-b-lg overflow-hidden">
              <img 
                src={profileUser.cover} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm cursor-pointer">
                <i className="ri-camera-fill"></i>
                Edit cover photo
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-4 relative">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Avatar */}
                <div className="relative -mt-20 md:-mt-8">
                  <img 
                    src={profileUser.avatar} 
                    alt={profileUser.name}
                    className="w-44 h-44 rounded-full border-4 border-white object-cover"
                  />
                  <button className="absolute bottom-3 right-3 w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                    <i className="ri-camera-fill text-lg"></i>
                  </button>
                </div>

                {/* Name & Stats */}
                <div className="flex-1 pb-4">
                  <h1 className="text-3xl font-bold">{profileUser.name}</h1>
                  <p className="text-gray-500 font-medium">{formatNumber(profileUser.followers)} followers · {formatNumber(profileUser.following)} following</p>
                  <div className="flex -space-x-2 mt-2">
                    {profileFriends.slice(0, 8).map(friend => (
                      <img 
                        key={friend.id}
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        title={friend.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pb-4">
                  <button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold cursor-pointer whitespace-nowrap">
                    <i className="ri-add-line"></i>
                    Add to story
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold cursor-pointer whitespace-nowrap">
                    <i className="ri-pencil-line"></i>
                    Edit profile
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg cursor-pointer">
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-gray-200 mt-4 -mx-8 px-8">
                <nav className="flex gap-1 -mb-px">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-4 font-semibold text-sm cursor-pointer transition-colors ${
                        activeTab === tab.id 
                          ? 'text-rose-500 border-b-4 border-rose-500' 
                          : 'text-gray-600 hover:bg-gray-100 rounded-lg'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <button className="px-4 py-4 font-semibold text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                    More <i className="ri-arrow-down-s-line"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Intro */}
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-xl font-bold mb-4">Intro</h2>
                <p className="text-center text-gray-700 mb-4">{profileUser.bio}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <i className="ri-briefcase-line text-gray-500 text-xl"></i>
                    <span>Works at <span className="font-semibold">{profileUser.workplace}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <i className="ri-graduation-cap-line text-gray-500 text-xl"></i>
                    <span>Studied at <span className="font-semibold">{profileUser.education}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <i className="ri-map-pin-line text-gray-500 text-xl"></i>
                    <span>Lives in <span className="font-semibold">{profileUser.location}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <i className="ri-heart-line text-gray-500 text-xl"></i>
                    <span>{profileUser.relationship}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <i className="ri-time-line text-gray-500 text-xl"></i>
                    <span>Joined {profileUser.joined}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-semibold cursor-pointer">
                  Edit details
                </button>
                <button className="w-full mt-2 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-semibold cursor-pointer">
                  Add hobbies
                </button>
                <button className="w-full mt-2 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-semibold cursor-pointer">
                  Add featured
                </button>
              </div>

              {/* Photos */}
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Photos</h2>
                  <Link to="#" className="text-rose-500 hover:bg-rose-50 px-3 py-1 rounded cursor-pointer">See all photos</Link>
                </div>
                <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                  {profilePhotos.slice(0, 9).map((photo, idx) => (
                    <img 
                      key={idx}
                      src={photo} 
                      alt={`Photo ${idx + 1}`}
                      className="w-full aspect-square object-cover cursor-pointer hover:opacity-90"
                    />
                  ))}
                </div>
              </div>

              {/* Friends */}
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Friends</h2>
                    <p className="text-gray-500 text-sm">{profileFriends.length * 100 + 47} friends</p>
                  </div>
                  <Link to="#" className="text-rose-500 hover:bg-rose-50 px-3 py-1 rounded cursor-pointer">See all friends</Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {profileFriends.slice(0, 9).map(friend => (
                    <Link key={friend.id} to="#" className="cursor-pointer">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <p className="font-semibold text-sm mt-1 truncate">{friend.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Posts */}
            <div className="lg:col-span-3 space-y-4">
              {/* Create Post */}
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex gap-3">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 text-left text-gray-500 cursor-pointer">
                    What's on your mind?
                  </button>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-3">
                  <div className="flex justify-around">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <i className="ri-live-line text-red-500 text-xl"></i>
                      <span className="text-gray-600 font-medium text-sm">Live video</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <i className="ri-image-line text-green-500 text-xl"></i>
                      <span className="text-gray-600 font-medium text-sm">Photo/video</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <i className="ri-emotion-happy-line text-yellow-500 text-xl"></i>
                      <span className="text-gray-600 font-medium text-sm">Life event</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter */}
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Posts</h2>
                  <div className="flex gap-2">
                    <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 font-medium cursor-pointer">
                      <i className="ri-equalizer-line"></i>
                      Filters
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 font-medium cursor-pointer">
                      <i className="ri-settings-3-line"></i>
                      Manage posts
                    </button>
                  </div>
                </div>
              </div>

              {/* Posts */}
              {profilePosts.map(post => (
                <article key={post.id} className="bg-white rounded-xl shadow">
                  {/* Post Header */}
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <img src={profileUser.avatar} alt={profileUser.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold">{profileUser.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{post.time}</span>
                          <span>·</span>
                          <i className={`ri-${post.privacy === 'public' ? 'earth' : 'group'}-line`}></i>
                        </div>
                      </div>
                    </div>
                    <button className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                      <i className="ri-more-fill text-xl text-gray-500"></i>
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Media */}
                  {post.image && (
                    <div className="cursor-pointer">
                      <img src={post.image} alt="Post" className="w-full object-cover max-h-[500px]" />
                    </div>
                  )}

                  {/* Reactions Count */}
                  <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-1">
                        <span className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                          <i className="ri-thumb-up-fill text-white text-xs"></i>
                        </span>
                        <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <i className="ri-heart-fill text-white text-xs"></i>
                        </span>
                      </div>
                      <span>{formatNumber(post.reactions.like + post.reactions.love + post.reactions.care)}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="hover:underline cursor-pointer">{post.comments} comments</span>
                      <span className="hover:underline cursor-pointer">{post.shares} shares</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 mx-4">
                    <div className="flex">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 cursor-pointer ${likedPosts.includes(post.id) ? 'text-rose-500' : 'text-gray-600'}`}
                      >
                        <i className={`ri-thumb-up-${likedPosts.includes(post.id) ? 'fill' : 'line'} text-xl`}></i>
                        <span className="font-medium">Like</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 text-gray-600 cursor-pointer">
                        <i className="ri-chat-1-line text-xl"></i>
                        <span className="font-medium">Comment</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 text-gray-600 cursor-pointer">
                        <i className="ri-share-forward-line text-xl"></i>
                        <span className="font-medium">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="p-4 pt-2 flex gap-2">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
                      <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        className="flex-1 bg-transparent text-sm focus:outline-none"
                      />
                      <div className="flex items-center gap-2 text-gray-500">
                        <button className="hover:text-gray-700 cursor-pointer"><i className="ri-emotion-line"></i></button>
                        <button className="hover:text-gray-700 cursor-pointer"><i className="ri-camera-line"></i></button>
                        <button className="hover:text-gray-700 cursor-pointer"><i className="ri-gift-line"></i></button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
