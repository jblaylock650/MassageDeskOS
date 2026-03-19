import { useState } from 'react';
import Header from '../../components/feature/Header';
import GroupCard from './components/GroupCard';
import CreateGroupModal from './components/CreateGroupModal';
import { userGroups as initialUserGroups, suggestedGroups as initialSuggestedGroups, allGroups as initialAllGroups, categories } from '../../mocks/groupsData';

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'your-groups'>('discover');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userGroups, setUserGroups] = useState(initialUserGroups);
  const [suggestedGroups, setSuggestedGroups] = useState(initialSuggestedGroups);
  const [allGroups, setAllGroups] = useState(initialAllGroups);

  const handleJoinToggle = (groupId: number) => {
    const updateGroupJoinStatus = (groups: any[]) =>
      groups.map(group =>
        group.id === groupId ? { ...group, isJoined: !group.isJoined } : group
      );

    setUserGroups(updateGroupJoinStatus(userGroups));
    setSuggestedGroups(updateGroupJoinStatus(suggestedGroups));
    setAllGroups(updateGroupJoinStatus(allGroups));
  };

  const handleCreateGroup = (groupData: any) => {
    const newGroup = {
      ...groupData,
      id: Date.now(),
      lastActivity: 'Just now'
    };
    setUserGroups([newGroup, ...userGroups]);
    setAllGroups([newGroup, ...allGroups]);
  };

  const filteredGroups = allGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           group.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const joinedGroups = userGroups.filter(group => group.isJoined);
  const notJoinedSuggestions = suggestedGroups.filter(group => !group.isJoined);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Groups</h1>
            <p className="text-gray-600">Connect with communities that share your interests</p>
          </div>

          {/* Tabs and Create Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'discover'
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-compass-3-line mr-2"></i>
                Discover
              </button>
              <button
                onClick={() => setActiveTab('your-groups')}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'your-groups'
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-group-line mr-2"></i>
                Your Groups
              </button>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line text-lg"></i>
              Create Group
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${cat.icon} text-base`}></i>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Based on Active Tab */}
          {activeTab === 'discover' ? (
            <div>
              {/* Suggested Groups */}
              {notJoinedSuggestions.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-star-line text-amber-500"></i>
                    Suggested For You
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notJoinedSuggestions.slice(0, 6).map(group => (
                      <GroupCard key={group.id} group={group} onJoinToggle={handleJoinToggle} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Groups */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-apps-2-line text-rose-500"></i>
                  All Groups
                  <span className="text-sm font-normal text-gray-500">({filteredGroups.length})</span>
                </h2>
                {filteredGroups.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredGroups.map(group => (
                      <GroupCard key={group.id} group={group} onJoinToggle={handleJoinToggle} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Your Groups */}
              {joinedGroups.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-group-fill text-rose-500"></i>
                    Groups You've Joined
                    <span className="text-sm font-normal text-gray-500">({joinedGroups.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {joinedGroups.map(group => (
                      <GroupCard key={group.id} group={group} onJoinToggle={handleJoinToggle} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <i className="ri-group-line text-6xl text-gray-300 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">You haven't joined any groups yet</h3>
                  <p className="text-gray-600 mb-6">Discover groups that match your interests</p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-6 py-3 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Explore Groups
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
}
