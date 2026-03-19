import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/feature/Header';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [coverPreview, setCoverPreview] = useState('https://readdy.ai/api/search-image?query=serene%20massage%20therapy%20spa%20interior%20with%20soft%20lighting%20plants%20and%20calming%20decor%20professional%20wellness%20center%20atmosphere%20warm%20tones&width=1200&height=400&seq=cover1&orientation=landscape');
  const [avatarPreview, setAvatarPreview] = useState('https://readdy.ai/api/search-image?query=professional%20headshot%20of%20massage%20therapist%20friendly%20smile%20wearing%20scrubs%20clean%20white%20background%20portrait%20photography&width=400&height=400&seq=avatar1&orientation=squarish');
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    credentials: ['LMT'],
    licenseNumber: 'MT-123456',
    licenseState: 'TX',
    yearsExperience: 8,
    specialties: ['Deep Tissue', 'Swedish', 'Sports Massage'],
    modalities: ['Trigger Point', 'Myofascial Release'],
    location: 'Austin, Texas',
    practiceSetting: 'Private Practice',
    openToNetworking: true,
    bio: 'Passionate massage therapist dedicated to helping clients achieve optimal wellness through therapeutic bodywork. Specializing in deep tissue and sports massage for athletes and active individuals.',
    website: '',
    instagram: '',
    ceInterests: ['Advanced Techniques', 'Business Development']
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    locationPrecision: 'city',
    allowConnectionRequests: true,
    showInDirectory: true
  });

  const credentialOptions = ['LMT', 'CMT', 'NCTMB', 'MMP', 'BCTMB', 'CPT', 'RYT'];
  const specialtyOptions = ['Deep Tissue', 'Swedish', 'Sports Massage', 'Prenatal', 'Hot Stone', 'Thai Massage', 'Reflexology', 'Lymphatic Drainage', 'Craniosacral', 'Aromatherapy'];
  const modalityOptions = ['Trigger Point', 'Myofascial Release', 'Neuromuscular', 'PNF Stretching', 'Cupping', 'Gua Sha', 'Energy Work', 'Shiatsu'];
  const practiceSettings = ['Private Practice', 'Spa', 'Chiropractic Office', 'Medical Clinic', 'Fitness Center', 'Mobile/Outcall', 'Corporate Wellness'];
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleArrayItem = (field: 'credentials' | 'specialties' | 'modalities' | 'ceInterests', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="pt-14">
        {/* Cover Photo Section */}
        <div className="relative h-72 md:h-80 bg-gray-200">
          <img 
            src={coverPreview} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="hidden"
          />
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm cursor-pointer transition-colors"
          >
            <i className="ri-camera-fill"></i>
            Change Cover Photo
          </button>
          <p className="absolute bottom-4 left-4 text-white/80 text-xs">Recommended: 1200 x 400 pixels</p>
        </div>

        {/* Avatar Section */}
        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="relative">
              <img 
                src={avatarPreview} 
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-2 right-2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors"
              >
                <i className="ri-camera-fill text-lg"></i>
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Edit Your Profile</h1>
              <p className="text-gray-500">Update your professional information</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-user-line text-teal-500"></i>
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Credentials</label>
              <div className="flex flex-wrap gap-2">
                {credentialOptions.map(cred => (
                  <button
                    key={cred}
                    onClick={() => toggleArrayItem('credentials', cred)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                      formData.credentials.includes(cred)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cred}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                  placeholder="MT-123456"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">License State</label>
                <select
                  value={formData.licenseState}
                  onChange={(e) => setFormData(prev => ({ ...prev, licenseState: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                >
                  <option value="">Select state</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map(spec => (
                  <button
                    key={spec}
                    onClick={() => toggleArrayItem('specialties', spec)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                      formData.specialties.includes(spec)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Modalities</label>
              <div className="flex flex-wrap gap-2">
                {modalityOptions.map(mod => (
                  <button
                    key={mod}
                    onClick={() => toggleArrayItem('modalities', mod)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                      formData.modalities.includes(mod)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Practice Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-building-line text-teal-500"></i>
              Practice Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Practice Setting</label>
                <select
                  value={formData.practiceSetting}
                  onChange={(e) => setFormData(prev => ({ ...prev, practiceSetting: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                >
                  {practiceSettings.map(setting => (
                    <option key={setting} value={setting}>{setting}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl mb-6">
              <input
                type="checkbox"
                id="openToNetworking"
                checked={formData.openToNetworking}
                onChange={(e) => setFormData(prev => ({ ...prev, openToNetworking: e.target.checked }))}
                className="w-5 h-5 accent-teal-500 cursor-pointer"
              />
              <label htmlFor="openToNetworking" className="cursor-pointer">
                <span className="font-medium text-gray-900">Open to Networking</span>
                <p className="text-sm text-gray-500">Let other therapists know you are open to connecting and building professional relationships</p>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value.slice(0, 500) }))}
                rows={4}
                maxLength={500}
                placeholder="Tell other therapists about yourself, your approach, and what makes your practice unique..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{formData.bio.length}/500</p>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-shield-line text-teal-500"></i>
              Privacy Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                <div className="flex gap-3">
                  {[
                    { id: 'public', label: 'Public', icon: 'ri-earth-line' },
                    { id: 'connections', label: 'Connections Only', icon: 'ri-group-line' },
                    { id: 'private', label: 'Private', icon: 'ri-lock-line' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setPrivacy(prev => ({ ...prev, profileVisibility: opt.id }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm cursor-pointer transition-all ${
                        privacy.profileVisibility === opt.id
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className={opt.icon}></i>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Precision</label>
                <div className="flex gap-3">
                  {[
                    { id: 'exact', label: 'Exact' },
                    { id: 'city', label: 'City Only' },
                    { id: 'state', label: 'State Only' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setPrivacy(prev => ({ ...prev, locationPrecision: opt.id }))}
                      className={`flex-1 py-2.5 rounded-lg font-medium text-sm cursor-pointer transition-all ${
                        privacy.locationPrecision === opt.id
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Allow Connection Requests</p>
                  <p className="text-sm text-gray-500">Other therapists can send you connection requests</p>
                </div>
                <button
                  onClick={() => setPrivacy(prev => ({ ...prev, allowConnectionRequests: !prev.allowConnectionRequests }))}
                  className={`w-12 h-7 rounded-full transition-colors cursor-pointer ${
                    privacy.allowConnectionRequests ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    privacy.allowConnectionRequests ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Show in Directory Search</p>
                  <p className="text-sm text-gray-500">Appear in therapist search results</p>
                </div>
                <button
                  onClick={() => setPrivacy(prev => ({ ...prev, showInDirectory: !prev.showInDirectory }))}
                  className={`w-12 h-7 rounded-full transition-colors cursor-pointer ${
                    privacy.showInDirectory ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    privacy.showInDirectory ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between py-6">
            <Link
              to="/profile"
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium cursor-pointer transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white px-8 py-2.5 rounded-lg font-semibold cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
