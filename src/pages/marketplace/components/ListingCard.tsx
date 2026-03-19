import { useState } from 'react';

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  distance: string;
  images: string[];
  seller: {
    name: string;
    avatar: string;
  };
  postedDate: string;
  saved: boolean;
}

interface ListingCardProps {
  listing: Listing;
  onSaveToggle: (id: string) => void;
  onContact: (listing: Listing) => void;
}

export default function ListingCard({ listing, onSaveToggle, onContact }: ListingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSaveToggle(listing.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <i className={`${listing.saved ? 'ri-heart-fill text-rose-500' : 'ri-heart-line text-gray-700'} text-lg`}></i>
        </button>
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700">
          {listing.condition}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-2">
            {listing.title}
          </h3>
        </div>

        <div className="text-2xl font-bold text-rose-500 mb-3">
          ${listing.price.toLocaleString()}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <i className="ri-map-pin-line text-gray-400 text-sm"></i>
          <span className="text-sm text-gray-600">{listing.location}</span>
          <span className="text-xs text-gray-400">• {listing.distance}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{listing.seller.name}</p>
              <p className="text-xs text-gray-500">{listing.postedDate}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onContact(listing);
            }}
            className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-lg hover:bg-rose-600 transition-colors whitespace-nowrap"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
