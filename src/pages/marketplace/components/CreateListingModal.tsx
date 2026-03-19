
import { useState, useRef } from 'react';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
}

interface CreateListingModalProps {
  onClose: () => void;
  onSubmit: (listing: any) => void;
}

export default function CreateListingModal({ onClose, onSubmit }: CreateListingModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Electronics',
    condition: 'Like New',
    location: '',
    description: '',
  });
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['Electronics', 'Vehicles', 'Home', 'Clothing', 'Sports', 'Books', 'Toys', 'Garden', 'Other'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(f => {
      const isImage = f.type.startsWith('image/');
      const isValidSize = f.size <= 20 * 1024 * 1024;
      return isImage && isValidSize;
    });

    const newMedia: MediaFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setMedia(prev => [...prev, ...newMedia].slice(0, 8));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  const removeMedia = (id: string) => {
    setMedia(prev => {
      const item = prev.find(m => m.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter(m => m.id !== id);
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setFormData({ ...formData, description: value });
      setCharCount(value.length);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.price.trim()) errs.price = 'Price is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newListing = {
      id: Date.now().toString(),
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      condition: formData.condition,
      location: formData.location,
      distance: '0 miles away',
      description: formData.description,
      images: media.length > 0
        ? media.map(m => m.preview)
        : ['https://readdy.ai/api/search-image?query=generic%20product%20placeholder%20image%20on%20clean%20white%20background%20with%20soft%20studio%20lighting%20professional%20photography%20style&width=600&height=400&seq=mpnew&orientation=landscape'],
      seller: {
        name: 'You',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20person%20portrait%20headshot%20with%20friendly%20smile%20natural%20lighting%20clean%20simple%20background&width=100&height=100&seq=mpuser&orientation=squarish',
        rating: 5.0,
        responseTime: 'Usually responds within an hour',
      },
      postedDate: 'Just now',
      saved: false,
    };

    onSubmit(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Create New Listing</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-gray-600"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Photos <span className="text-gray-400 font-normal">(up to 8)</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed transition-all ${
                isDragging ? 'border-rose-400 bg-rose-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              {media.length > 0 ? (
                <div className="p-3">
                  <div className="grid grid-cols-4 gap-2">
                    {media.map((item) => (
                      <div key={item.id} className="relative rounded-lg overflow-hidden group h-24">
                        <img src={item.preview} alt="Upload" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeMedia(item.id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-gray-900/70 hover:bg-gray-900/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <i className="ri-close-line text-white text-xs"></i>
                        </button>
                      </div>
                    ))}
                    {media.length < 8 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-rose-400 hover:bg-rose-50 cursor-pointer transition-colors"
                      >
                        <i className="ri-add-line text-xl text-gray-400"></i>
                        <span className="text-xs text-gray-400">Add</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-2">{media.length}/8 photos</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="ri-camera-line text-2xl text-gray-500"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Add photos</p>
                  <p className="text-xs text-gray-400">or drag and drop \u00b7 Max 20MB each</p>
                </button>
              )}
              {isDragging && (
                <div className="absolute inset-0 bg-rose-50/90 rounded-xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <i className="ri-upload-cloud-2-line text-3xl text-rose-500 mb-1"></i>
                    <p className="text-sm font-semibold text-rose-600">Drop photos here</p>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => { setFormData({ ...formData, title: e.target.value }); setErrors({ ...errors, title: '' }); }}
              placeholder="What are you selling?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Price <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => { setFormData({ ...formData, price: e.target.value }); setErrors({ ...errors, price: '' }); }}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm ${errors.price ? 'border-red-400' : 'border-gray-300'}`}
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm cursor-pointer"
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => { setFormData({ ...formData, location: e.target.value }); setErrors({ ...errors, location: '' }); }}
                placeholder="City, State"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm ${errors.location ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Describe your item in detail..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm resize-none ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? <p className="text-xs text-red-500">{errors.description}</p> : <span />}
              <span className={`text-xs ${charCount > 450 ? 'text-rose-500' : 'text-gray-500'}`}>{charCount}/500</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-rose-200/50"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
