
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import { eventsData, eventCategories } from '../../mocks/eventsData';
import CreateEventModal from './components/CreateEventModal';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [interestedEvents, setInterestedEvents] = useState<number[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.type === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleInterested = (eventId: number) => {
    setInterestedEvents(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const handleRegister = (eventId: number) => {
    setRegisteredEvents(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      workshop: 'bg-teal-500',
      networking: 'bg-amber-500',
      trade: 'bg-rose-500',
      social: 'bg-emerald-500',
      virtual: 'bg-indigo-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      workshop: 'CE Workshop',
      networking: 'Networking',
      trade: 'Trade Session',
      social: 'Social',
      virtual: 'Virtual'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <Header />
      
      <div className="pt-14">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white py-12 px-4">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          <div className="max-w-6xl mx-auto relative">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Events</h1>
            <p className="text-teal-100 text-lg mb-6">Connect, learn, and grow with fellow massage therapists</p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search events, locations, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-white text-teal-600 hover:bg-teal-50 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-colors"
              >
                <i className="ri-add-line text-lg"></i>
                Create Event
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Categories</h3>
                <nav className="space-y-1">
                  {eventCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${
                        activeCategory === cat.id 
                          ? 'bg-teal-50 text-teal-700' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <i className={`${cat.icon} text-lg`}></i>
                      <span className="font-medium text-sm">{cat.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Your Events</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Registered</span>
                    <span className="font-semibold text-teal-600">{registeredEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Interested</span>
                    <span className="font-semibold text-amber-600">{interestedEvents.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">CE Credits Earned</span>
                    <span className="font-semibold text-emerald-600">24</span>
                  </div>
                </div>
              </div>

              {/* Upcoming */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-900 mb-3">Coming Up</h3>
                <div className="space-y-3">
                  {eventsData.slice(0, 3).map(event => (
                    <div key={event.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-teal-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-xs text-teal-600 font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="text-lg font-bold text-teal-700">{new Date(event.date).getDate()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{event.title}</p>
                        <p className="text-xs text-gray-500 truncate">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredEvents.length}</span> events found
                </p>
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm cursor-pointer focus:outline-none focus:border-teal-400">
                  <option>Upcoming First</option>
                  <option>Most Popular</option>
                  <option>Nearest</option>
                  <option>Price: Low to High</option>
                </select>
              </div>

              {/* Events Grid */}
              <div className="grid gap-4">
                {filteredEvents.map(event => (
                  <article key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-72 h-48 md:h-auto relative flex-shrink-0">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-3 left-3 ${getTypeColor(event.type)} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
                          {getTypeLabel(event.type)}
                        </span>
                        <button
                          onClick={() => toggleInterested(event.id)}
                          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                            interestedEvents.includes(event.id) 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-white/90 text-gray-600 hover:bg-white'
                          }`}
                        >
                          <i className={`ri-heart-${interestedEvents.includes(event.id) ? 'fill' : 'line'} text-lg`}></i>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-bold text-lg text-gray-900 hover:text-teal-600 cursor-pointer transition-colors">
                            {event.title}
                          </h3>
                          {event.ceCredits > 0 && (
                            <span className="flex-shrink-0 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                              {event.ceCredits} CE Credits
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <i className="ri-calendar-line"></i>
                            {formatDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line"></i>
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-map-pin-line"></i>
                            {event.location}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                        {/* Host */}
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src={event.host.avatar} 
                            alt={event.host.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{event.host.name}</p>
                            <p className="text-xs text-gray-500">{event.host.credentials}</p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map((tag, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <i className="ri-user-line"></i>
                              {event.attendees}/{event.maxCapacity}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-heart-line"></i>
                              {event.interested} interested
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">
                              {event.price === 0 ? 'Free' : `$${event.price}`}
                            </span>
                            <button
                              onClick={() => handleRegister(event.id)}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer whitespace-nowrap transition-all ${
                                registeredEvents.includes(event.id)
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-teal-500 hover:bg-teal-600 text-white'
                              }`}
                            >
                              {registeredEvents.includes(event.id) ? (
                                <span className="flex items-center gap-1">
                                  <i className="ri-check-line"></i>
                                  Registered
                                </span>
                              ) : (
                                'Register'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-calendar-line text-3xl text-gray-400"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="text-teal-600 font-semibold hover:underline cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
