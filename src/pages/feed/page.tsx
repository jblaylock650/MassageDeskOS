import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import { currentUser, stories, posts as initialPosts, contacts, shortcuts } from '../../mocks/feedData';
import CreatePostModal from './components/CreatePostModal';
import NotificationToast from '../../components/feature/NotificationToast';
import ImageLightbox from '../../components/feature/ImageLightbox';

const liveNotifications = [
  { id: 901, user: { name: 'Sarah Chen, LMT', avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20asian%20woman%20massage%20therapist%20smiling%20warmly%20wearing%20scrubs%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt1&orientation=squarish' }, action: 'liked your post', icon: 'ri-thumb-up-fill', iconColor: 'text-teal-500', iconBg: 'bg-teal-100' },
  { id: 902, user: { name: 'Marcus Johnson, CMT', avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20african%20american%20male%20massage%20therapist%20friendly%20expression%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt2&orientation=squarish' }, action: 'sent you a connection request', icon: 'ri-user-add-fill', iconColor: 'text-rose-500', iconBg: 'bg-rose-100' },
  { id: 903, user: { name: 'Emily Rodriguez, LMT', avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20latina%20woman%20massage%20therapist%20cheerful%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt3&orientation=squarish' }, action: 'shared your CE workshop post', icon: 'ri-share-forward-fill', iconColor: 'text-sky-500', iconBg: 'bg-sky-100' },
  { id: 904, user: { name: 'David Kim, NCTMB', avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20korean%20american%20male%20massage%20therapist%20casual%20style%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt4&orientation=squarish' }, action: 'sent you a message', icon: 'ri-message-3-fill', iconColor: 'text-amber-500', iconBg: 'bg-amber-100' },
];

export default function FeedPage() {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [toasts, setToasts] = useState<typeof liveNotifications>([]);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const toastIndex = useRef(0);
  const storiesRef = useRef<HTMLDivElement>(null);

  // Simulated real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (toastIndex.current < liveNotifications.length) {
        const notif = { ...liveNotifications[toastIndex.current], id: Date.now() };
        setToasts(prev => [...prev, notif]);
        toastIndex.current += 1;
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleNewPost = (post: any) => {
    setPosts(prev => [post, ...prev]);
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const scrollStories = (direction: 'left' | 'right') => {
    if (storiesRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      storiesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <NotificationToast notifications={toasts} onDismiss={dismissToast} />
      
      {/* Image Lightbox */}
      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxImages(null)}
        />
      )}
      
      <div className="pt-14 flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-72 fixed left-0 top-14 h-[calc(100vh-56px)] overflow-y-auto p-4">
          <nav className="space-y-1">
            <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <span className="font-medium text-sm">{currentUser.name}</span>
                <p className="text-xs text-gray-500">{currentUser.credentials}</p>
              </div>
            </Link>
            <Link to="/friends" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="ri-user-heart-fill text-teal-600 text-xl"></i>
              </div>
              <span className="font-medium">Connections</span>
            </Link>
            <Link to="/events" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
                <i className="ri-calendar-event-fill text-rose-500 text-xl"></i>
              </div>
              <span className="font-medium">Events &amp; CE</span>
            </Link>
            <Link to="/groups" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="ri-group-fill text-teal-600 text-xl"></i>
              </div>
              <span className="font-medium">Groups</span>
            </Link>
            <Link to="/marketplace" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
                <i className="ri-store-2-fill text-rose-500 text-xl"></i>
              </div>
              <span className="font-medium">Marketplace</span>
            </Link>
            <Link to="/messages" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center">
                <i className="ri-message-3-fill text-amber-600 text-xl"></i>
              </div>
              <span className="font-medium">Messages</span>
            </Link>
          </nav>

          <div className="border-t border-gray-300 my-4"></div>

          <div>
            <h3 className="px-2 text-gray-500 font-semibold text-sm mb-2">Your Groups</h3>
            {shortcuts.map(shortcut => (
              <Link key={shortcut.id} to="/groups" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <img src={shortcut.image} alt={shortcut.name} className="w-9 h-9 rounded-lg object-cover" />
                <span className="font-medium text-sm truncate">{shortcut.name}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 px-2 text-xs text-gray-500">
            <p>Privacy &middot; Terms &middot; Advertising &middot; Ad Choices &middot; Cookies &middot; More &middot; TheraLinkNetwork &copy; 2025</p>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 lg:ml-72 lg:mr-80 px-4 py-6 max-w-2xl mx-auto">
          {/* Stories */}
          <div className="relative mb-4">
            <div 
              ref={storiesRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {stories.map((story, index) => (
                <div 
                  key={story.id} 
                  className={`relative flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden cursor-pointer group ${story.isCreate ? 'bg-white border border-gray-200' : ''}`}
                >
                  {story.isCreate ? (
                    <>
                      <img src={story.avatar} alt="Create" className="w-full h-32 object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-white pt-6 pb-3 text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center border-4 border-white">
                          <i className="ri-add-line text-white text-xl"></i>
                        </div>
                        <span className="text-xs font-semibold">Create story</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={story.image} alt={story.user} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-teal-500 overflow-hidden">
                        <img src={story.avatar} alt={story.user} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold truncate">{story.user}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={() => scrollStories('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 cursor-pointer z-10"
            >
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            <button 
              onClick={() => scrollStories('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 cursor-pointer z-10"
            >
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </div>

          {/* Create Post */}
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <div className="flex gap-3">
              <Link to="/profile">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
              </Link>
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 text-left text-gray-500 cursor-pointer"
              >
                Share something with the community, {currentUser.name.split(' ')[0]}...
              </button>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-3">
              <div className="flex justify-around">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="ri-live-line text-red-500 text-xl"></i>
                  <span className="text-gray-600 font-medium text-sm">Live video</span>
                </button>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <i className="ri-image-line text-green-500 text-xl"></i>
                  <span className="text-gray-600 font-medium text-sm">Photo/video</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="ri-emotion-happy-line text-teal-500 text-xl"></i>
                  <span className="text-gray-600 font-medium text-sm">Feeling/activity</span>
                </button>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow mb-4">
              {/* Post Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                  <Link to={post.user.isPage ? '#' : '/profile'}>
                    <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
                  </Link>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link to={post.user.isPage ? '#' : '/profile'} className="font-semibold hover:underline cursor-pointer">{post.user.name}</Link>
                      {post.sponsored && <span className="text-xs text-gray-500">· Sponsored</span>}
                    </div>
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
                <div 
                  className="cursor-pointer"
                  onClick={() => openLightbox([post.image!], 0)}
                >
                  <img src={post.image} alt="Post" className="w-full object-cover max-h-[500px] hover:opacity-95 transition-opacity" />
                </div>
              )}
              {post.images && (
                <div className="grid grid-cols-2 gap-1">
                  {post.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer relative group"
                      onClick={() => openLightbox(post.images!, idx)}
                    >
                      <img src={img} alt={`Post ${idx + 1}`} className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <i className="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reactions Count */}
              <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                      <i className="ri-thumb-up-fill text-white text-xs"></i>
                    </span>
                    <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="ri-heart-fill text-white text-xs"></i>
                    </span>
                    {post.reactions.care > 0 && (
                      <span className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                        <i className="ri-hand-heart-fill text-white text-xs"></i>
                      </span>
                    )}
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
                    className={`flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 cursor-pointer ${likedPosts.includes(post.id) ? 'text-teal-500' : 'text-gray-600'}`}
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
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 fixed right-0 top-14 h-[calc(100vh-56px)] overflow-y-auto p-4">
          {/* Networking CTA */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-4 mb-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-community-fill text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold">Grow Your Network</h3>
                <p className="text-teal-100 text-xs">Connect with peers!</p>
              </div>
            </div>
            <p className="text-sm text-teal-50 mb-3">Discover and connect with massage therapists in your area. Build relationships and grow together.</p>
            <Link to="/friends" className="block w-full bg-white text-teal-600 py-2 rounded-lg font-semibold text-sm hover:bg-teal-50 cursor-pointer transition-colors whitespace-nowrap text-center">
              Find Connections
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 font-semibold text-sm">Upcoming CE Events</h3>
              <Link to="/events" className="text-teal-500 text-xs font-medium hover:underline cursor-pointer">See all</Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3 space-y-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs text-teal-600 font-medium">Feb</span>
                  <span className="text-lg font-bold text-teal-700">15</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Deep Tissue Workshop</p>
                  <p className="text-xs text-gray-500">Austin, TX · 6 CE Credits</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-rose-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs text-rose-600 font-medium">Feb</span>
                  <span className="text-lg font-bold text-rose-700">22</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Prenatal Certification</p>
                  <p className="text-xs text-gray-500">Phoenix, AZ · 16 CE Credits</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          {/* Contacts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-500 font-semibold text-sm">Connections</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                  <i className="ri-vidicon-line text-gray-500"></i>
                </button>
                <button className="w-8 h-8 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                  <i className="ri-search-line text-gray-500"></i>
                </button>
              </div>
            </div>
            <div className="space-y-1">
              {contacts.map(contact => (
                <button key={contact.id} className="w-full flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <div className="relative">
                    <img src={contact.avatar} alt={contact.name} className="w-9 h-9 rounded-full object-cover" />
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <span className="font-medium text-sm">{contact.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleNewPost}
        />
      )}
    </div>
  );
}
