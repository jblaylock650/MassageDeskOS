
import { useState } from 'react';

interface CreateEventModalProps {
  onClose: () => void;
}

export default function CreateEventModal({ onClose }: CreateEventModalProps) {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    isVirtual: false,
    meetingLink: '',
    ceCredits: 0,
    maxCapacity: 50,
    price: 0,
    isFree: true,
    tags: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    { id: 'workshop', label: 'CE Workshop', icon: 'ri-book-open-line', description: 'Educational training with CE credits' },
    { id: 'networking', label: 'Networking', icon: 'ri-group-line', description: 'Meet and connect with peers' },
    { id: 'trade', label: 'Trade Session', icon: 'ri-hand-heart-line', description: 'Exchange massage services' },
    { id: 'social', label: 'Social Gathering', icon: 'ri-cup-line', description: 'Casual community meetup' },
    { id: 'virtual', label: 'Virtual Event', icon: 'ri-vidicon-line', description: 'Online workshop or meetup' }
  ];

  const tagOptions = [
    'Deep Tissue', 'Swedish', 'Sports Massage', 'Prenatal', 'Hot Stone', 
    'Myofascial Release', 'Trigger Point', 'Reflexology', 'Thai Massage',
    'CE Credits', 'Hands-On', 'Beginner Friendly', 'Advanced', 'Business'
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Event</h2>
            <p className="text-sm text-gray-500">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 hover:bg-gray-100 rounded-full flex items-center justify-center cursor-pointer transition-colors"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-teal-500 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Step 1: Event Type */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">What type of event are you creating?</h3>
              <div className="grid gap-3">
                {eventTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setEventType(type.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                      eventType === type.id 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      eventType === type.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <i className={`${type.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{type.label}</p>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                    {eventType === type.id && (
                      <i className="ri-check-line text-teal-500 text-xl ml-auto"></i>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Event Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Deep Tissue Techniques Workshop"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value.slice(0, 500) }))}
                  placeholder="Describe your event, what attendees will learn or experience..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{formData.description.length}/500</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Start</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">End</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <label className="flex items-center gap-2 text-sm text-gray-500 ml-auto cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVirtual}
                      onChange={(e) => setFormData(prev => ({ ...prev, isVirtual: e.target.checked }))}
                      className="accent-teal-500 cursor-pointer"
                    />
                    Virtual event
                  </label>
                </div>
                {formData.isVirtual ? (
                  <input
                    type="url"
                    value={formData.meetingLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                    placeholder="Zoom or meeting link"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Venue name and address"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                  />
                )}
              </div>

              {eventType === 'workshop' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CE Credits Offered</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.ceCredits}
                    onChange={(e) => setFormData(prev => ({ ...prev, ceCredits: parseInt(e.target.value) || 0 }))}
                    className="w-32 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pricing & Tags */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Pricing</label>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, isFree: true, price: 0 }))}
                    className={`flex-1 py-3 rounded-xl font-medium cursor-pointer transition-all ${
                      formData.isFree 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Free Event
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, isFree: false }))}
                    className={`flex-1 py-3 rounded-xl font-medium cursor-pointer transition-all ${
                      !formData.isFree 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Paid Event
                  </button>
                </div>
                {!formData.isFree && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      className="w-32 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                    />
                    <span className="text-gray-500 text-sm">per person</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Maximum Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) || 1 }))}
                  className="w-32 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Tags (select up to 5)</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      disabled={formData.tags.length >= 5 && !formData.tags.includes(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
                        formData.tags.includes(tag)
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-xl p-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Event Preview</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                  <p><strong>Date:</strong> {formData.date || 'Not set'} {formData.startTime && `at ${formData.startTime}`}</p>
                  <p><strong>Location:</strong> {formData.isVirtual ? 'Virtual Event' : (formData.location || 'Not set')}</p>
                  <p><strong>Price:</strong> {formData.isFree ? 'Free' : `$${formData.price}`}</p>
                  <p><strong>Capacity:</strong> {formData.maxCapacity} attendees</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium cursor-pointer transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !eventType}
              className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-semibold cursor-pointer transition-colors whitespace-nowrap"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.title || !formData.date}
              className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-semibold cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                'Create Event'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
