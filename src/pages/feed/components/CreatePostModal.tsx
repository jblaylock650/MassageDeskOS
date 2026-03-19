
import { useState, useRef, useCallback } from 'react';
import { currentUser } from '../../../mocks/feedData';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (post: any) => void;
}

export default function CreatePostModal({ onClose, onSubmit }: CreatePostModalProps) {
  const [text, setText] = useState('');
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'only-me'>('public');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 5000) {
      setText(val);
      setCharCount(val.length);
    }
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(f => {
      const isImage = f.type.startsWith('image/');
      const isVideo = f.type.startsWith('video/');
      const isValidSize = f.size <= 50 * 1024 * 1024;
      return (isImage || isVideo) && isValidSize;
    });

    const newMedia: MediaFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image',
    }));

    setMedia(prev => [...prev, ...newMedia].slice(0, 10));
  }, []);

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
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeMedia = (id: string) => {
    setMedia(prev => {
      const item = prev.find(m => m.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter(m => m.id !== id);
    });
  };

  const handleSubmit = () => {
    if (!text.trim() && media.length === 0) return;
    setIsPosting(true);

    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        time: 'Just now',
        privacy,
        content: text,
        image: media.length === 1 ? media[0].preview : undefined,
        images: media.length > 1 ? media.map(m => m.preview) : undefined,
        mediaTypes: media.map(m => m.type),
        reactions: { like: 0, love: 0, care: 0 },
        comments: 0,
        shares: 0,
      };
      onSubmit(newPost);
      setIsPosting(false);
      onClose();
    }, 600);
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: 'ri-earth-line', desc: 'Anyone can see this post' },
    { value: 'friends', label: 'Friends', icon: 'ri-group-line', desc: 'Only your friends can see' },
    { value: 'only-me', label: 'Only me', icon: 'ri-lock-line', desc: 'Only you can see this post' },
  ];

  const currentPrivacy = privacyOptions.find(p => p.value === privacy);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl animate-[fadeIn_0.15s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="w-9" />
          <h2 className="text-xl font-bold text-gray-900">Create post</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>

        {/* User Info + Privacy */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-sm text-gray-900">{currentUser.name}</p>
            <div className="relative">
              <button
                onClick={() => setShowPrivacy(!showPrivacy)}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-0.5 text-xs font-medium text-gray-700 cursor-pointer transition-colors"
              >
                <i className={`${currentPrivacy?.icon} text-sm`}></i>
                <span>{currentPrivacy?.label}</span>
                <i className="ri-arrow-down-s-fill text-sm"></i>
              </button>
              {showPrivacy && (
                <div className="absolute top-8 left-0 bg-white rounded-xl shadow-xl border border-gray-100 w-56 z-10 py-1">
                  {privacyOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setPrivacy(opt.value as any); setShowPrivacy(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors ${privacy === opt.value ? 'bg-rose-50' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${privacy === opt.value ? 'bg-rose-100' : 'bg-gray-100'}`}>
                        <i className={`${opt.icon} ${privacy === opt.value ? 'text-rose-500' : 'text-gray-600'}`}></i>
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-medium ${privacy === opt.value ? 'text-rose-600' : 'text-gray-900'}`}>{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.desc}</p>
                      </div>
                      {privacy === opt.value && <i className="ri-check-line text-rose-500 ml-auto"></i>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5">
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder={`What\u2019s on your mind, ${currentUser.name.split(' ')[0]}?`}
            className="w-full resize-none text-gray-900 placeholder-gray-400 focus:outline-none text-base min-h-[100px] py-2"
            rows={media.length > 0 ? 3 : 5}
          />

          {/* Media Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-xl border-2 border-dashed transition-all mb-3 ${
              isDragging
                ? 'border-rose-400 bg-rose-50'
                : media.length > 0
                ? 'border-gray-200 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            }`}
          >
            {media.length > 0 ? (
              <div className="p-3">
                <div className={`grid gap-2 ${
                  media.length === 1 ? 'grid-cols-1' :
                  media.length === 2 ? 'grid-cols-2' :
                  media.length === 3 ? 'grid-cols-2' :
                  'grid-cols-2'
                }`}>
                  {media.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`relative rounded-lg overflow-hidden group ${
                        media.length === 3 && idx === 0 ? 'row-span-2' : ''
                      } ${media.length === 1 ? 'h-64' : 'h-40'}`}
                    >
                      {item.type === 'video' ? (
                        <video
                          src={item.preview}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={item.preview}
                          alt="Upload preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                            <i className="ri-play-fill text-white text-2xl"></i>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => removeMedia(item.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-gray-900/70 hover:bg-gray-900/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <i className="ri-close-line text-white text-sm"></i>
                      </button>
                      {item.type === 'video' && (
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">Video</span>
                      )}
                    </div>
                  ))}
                </div>

                {media.length < 10 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 w-full py-2 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <i className="ri-add-circle-line text-lg text-rose-500"></i>
                    Add more photos/videos
                  </button>
                )}
                <p className="text-xs text-gray-400 text-center mt-1">{media.length}/10 files</p>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-10 flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <i className="ri-image-add-line text-2xl text-gray-600"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">Add photos/videos</p>
                <p className="text-xs text-gray-500">or drag and drop</p>
                <p className="text-xs text-gray-400">Up to 10 files \u00b7 Max 50MB each</p>
              </button>
            )}

            {isDragging && (
              <div className="absolute inset-0 bg-rose-50/90 rounded-xl flex items-center justify-center z-10">
                <div className="text-center">
                  <i className="ri-upload-cloud-2-line text-4xl text-rose-500 mb-2"></i>
                  <p className="text-sm font-semibold text-rose-600">Drop files here</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Bottom Actions */}
        <div className="px-5 pb-4 pt-2">
          {/* Add to post bar */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3">
            <span className="text-sm font-medium text-gray-900">Add to your post</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-50 cursor-pointer transition-colors"
                title="Photo/Video"
              >
                <i className="ri-image-line text-xl text-green-500"></i>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-sky-50 cursor-pointer transition-colors" title="Tag people">
                <i className="ri-user-add-line text-xl text-sky-500"></i>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-yellow-50 cursor-pointer transition-colors" title="Feeling/Activity">
                <i className="ri-emotion-happy-line text-xl text-yellow-500"></i>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 cursor-pointer transition-colors" title="Check in">
                <i className="ri-map-pin-line text-xl text-red-500"></i>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-amber-50 cursor-pointer transition-colors" title="GIF">
                <i className="ri-file-gif-line text-xl text-amber-500"></i>
              </button>
            </div>
          </div>

          {/* Post Button */}
          <button
            onClick={handleSubmit}
            disabled={(!text.trim() && media.length === 0) || isPosting}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              (text.trim() || media.length > 0) && !isPosting
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-lg shadow-rose-200/50 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isPosting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Posting...
              </span>
            ) : (
              'Post'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
