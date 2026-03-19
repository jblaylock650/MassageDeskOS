import { useState } from 'react';

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    coverImage: string;
    memberCount: number;
    privacy: string;
    category: string;
    description: string;
    lastActivity?: string;
    mutualMembers?: number;
    isJoined: boolean;
  };
  onJoinToggle: (groupId: number) => void;
}

export default function GroupCard({ group, onJoinToggle }: GroupCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={group.coverImage} 
          alt={group.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
          <i className={`${group.privacy === 'Public' ? 'ri-global-line' : 'ri-lock-line'} text-sm`}></i>
          {group.privacy}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-1">{group.name}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{group.description}</p>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <i className="ri-group-line"></i>
            <span>{group.memberCount.toLocaleString()} members</span>
          </div>
          {group.lastActivity && (
            <div className="flex items-center gap-1">
              <i className="ri-time-line"></i>
              <span>{group.lastActivity}</span>
            </div>
          )}
        </div>

        {group.mutualMembers && (
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
            <i className="ri-user-shared-line"></i>
            <span>{group.mutualMembers} mutual members</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onJoinToggle(group.id);
          }}
          className={`w-full py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
            group.isJoined
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-rose-500 text-white hover:bg-rose-600'
          }`}
        >
          {group.isJoined ? (
            <span className="flex items-center justify-center gap-1">
              <i className="ri-check-line"></i>
              Joined
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              <i className="ri-add-line"></i>
              Join Group
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
