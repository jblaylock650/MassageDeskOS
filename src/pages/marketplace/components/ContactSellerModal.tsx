interface ContactSellerModalProps {
  listing: any;
  onClose: () => void;
}

export default function ContactSellerModal({ listing, onClose }: ContactSellerModalProps) {
  const handleSendMessage = () => {
    alert(`Message sent to ${listing.seller.name}! They will respond soon.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Contact Seller</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
              <p className="text-lg font-bold text-rose-500">${listing.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{listing.seller.name}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <i className="ri-star-fill text-amber-500 text-xs"></i>
                <span>{listing.seller.rating}</span>
                <span className="text-gray-400">•</span>
                <span className="text-xs">{listing.seller.responseTime}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Your Message
            </label>
            <textarea
              placeholder={`Hi, I'm interested in your ${listing.title}. Is it still available?`}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              className="flex-1 px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-colors whitespace-nowrap"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
