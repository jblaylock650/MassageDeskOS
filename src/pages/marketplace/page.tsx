import { useState } from 'react';
import Header from '../../components/feature/Header';
import { marketplaceListings, categories, conditions } from '../../mocks/marketplaceData';
import ListingCard from './components/ListingCard';
import CreateListingModal from './components/CreateListingModal';
import ContactSellerModal from './components/ContactSellerModal';

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'your-listings'>('browse');
  const [listings, setListings] = useState(marketplaceListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [userListings, setUserListings] = useState<any[]>([]);

  const handleSaveToggle = (id: string) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, saved: !listing.saved } : listing
    ));
  };

  const handleCreateListing = (newListing: any) => {
    setUserListings([newListing, ...userListings]);
    setListings([newListing, ...listings]);
  };

  const handleContact = (listing: any) => {
    setSelectedListing(listing);
    setShowContactModal(true);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || listing.condition === selectedCondition;
    
    const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    const matchesPrice = listing.price >= minPrice && listing.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  const savedListings = listings.filter(l => l.saved);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Marketplace</h1>
            <p className="text-gray-600">Buy and sell items in your community</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-add-line text-xl"></i>
            Sell Something
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === 'browse'
                ? 'text-rose-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse
            {activeTab === 'browse' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('your-listings')}
            className={`px-6 py-3 font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === 'your-listings'
                ? 'text-rose-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Your Listings
            {userListings.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-600 text-xs font-bold rounded-full">
                {userListings.length}
              </span>
            )}
            {activeTab === 'your-listings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className="px-6 py-3 font-semibold text-gray-600 hover:text-gray-900 transition-colors relative whitespace-nowrap"
          >
            Saved
            {savedListings.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                {savedListings.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'browse' && (
          <>
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Search</label>
                  <div className="relative">
                    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for items..."
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm cursor-pointer"
                  >
                    {conditions.map((cond) => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Min Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Max Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      placeholder="Any"
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredListings.length}</span> items found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onSaveToggle={handleSaveToggle}
                  onContact={handleContact}
                />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-16">
                <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'your-listings' && (
          <div>
            {userListings.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">{userListings.length}</span> active listings
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {userListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onSaveToggle={handleSaveToggle}
                      onContact={handleContact}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <i className="ri-store-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-6">Start selling by creating your first listing</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-add-line text-xl"></i>
                  Create Listing
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateListingModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateListing}
        />
      )}

      {showContactModal && selectedListing && (
        <ContactSellerModal
          listing={selectedListing}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}
