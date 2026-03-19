
export const currentUser = {
  id: 'user1',
  name: 'John Smith',
  credentials: 'LMT',
  avatar:
    'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20male%20massage%20therapist%20in%20his%2030s%20friendly%20smile%20wearing%20scrubs%20clean%20white%20background%20portrait%20photography&width=100&height=100&seq=mt10&orientation=squarish',
};

export const stories = [
  { id: 1, user: 'Create story', avatar: currentUser.avatar, isCreate: true },
  {
    id: 2,
    user: 'Sarah Chen, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20asian%20woman%20massage%20therapist%20smiling%20warmly%20wearing%20scrubs%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt1&orientation=squarish',
    image:
      'https://readdy.ai/api/search-image?query=peaceful%20massage%20therapy%20room%20with%20massage%20table%20warm%20lighting%20candles%20plants%20serene%20spa%20atmosphere%20professional%20setting&width=200&height=350&seq=st20&orientation=portrait',
  },
  {
    id: 3,
    user: 'Marcus Johnson, CMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20african%20american%20male%20massage%20therapist%20friendly%20expression%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt2&orientation=squarish',
    image:
      'https://readdy.ai/api/search-image?query=massage%20therapy%20continuing%20education%20workshop%20classroom%20setting%20with%20massage%20tables%20professional%20training%20environment&width=200&height=350&seq=st21&orientation=portrait',
  },
  {
    id: 4,
    user: 'Emily Rodriguez, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20latina%20woman%20massage%20therapist%20cheerful%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt3&orientation=squarish',
    image:
      'https://readdy.ai/api/search-image?query=hot%20stone%20massage%20therapy%20setup%20with%20smooth%20black%20stones%20on%20wooden%20tray%20spa%20wellness%20atmosphere&width=200&height=350&seq=st22&orientation=portrait',
  },
  {
    id: 5,
    user: 'David Kim, NCTMB',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20korean%20american%20male%20massage%20therapist%20casual%20style%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt4&orientation=squarish',
    image:
      'https://readdy.ai/api/search-image?query=sports%20massage%20therapy%20session%20athlete%20receiving%20treatment%20professional%20sports%20medicine%20setting&width=200&height=350&seq=st23&orientation=portrait',
  },
  {
    id: 6,
    user: 'Lisa Thompson, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20woman%20massage%20therapist%20with%20glasses%20friendly%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt5&orientation=squarish',
    image:
      'https://readdy.ai/api/search-image?query=aromatherapy%20essential%20oils%20collection%20for%20massage%20therapy%20beautiful%20glass%20bottles%20with%20herbs%20natural%20wellness&width=200&height=350&seq=st24&orientation=portrait',
  },
];

export const posts = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen, LMT',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20asian%20woman%20massage%20therapist%20smiling%20warmly%20wearing%20scrubs%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt1&orientation=squarish',
    },
    time: '2 hours ago',
    privacy: 'public',
    content:
      'Just completed an amazing deep tissue workshop in Austin! 🙌 Learned some incredible new techniques for treating chronic lower back pain. The instructor emphasized the importance of proper body mechanics - something we all need to remember for our own self-care. Who else prioritizes their own wellness? #MassageTherapist #ContinuingEducation #SelfCare',
    image:
      'https://readdy.ai/api/search-image?query=massage%20therapy%20continuing%20education%20workshop%20with%20therapists%20practicing%20techniques%20on%20massage%20tables%20professional%20training%20environment%20warm%20lighting&width=800&height=500&seq=fp30&orientation=landscape',
    reactions: { like: 234, love: 89, care: 12 },
    comments: 45,
    shares: 12,
  },
  {
    id: 2,
    user: {
      name: 'TheraLinkNetwork Community',
      avatar:
        'https://readdy.ai/api/search-image?query=modern%20wellness%20community%20logo%20icon%20teal%20and%20coral%20gradient%20colors%20minimalist%20professional%20design&width=100&height=100&seq=tllogo&orientation=squarish',
      isPage: true,
    },
    time: '4 hours ago',
    privacy: 'public',
    sponsored: true,
    content:
      '🌟 Self-Care Sunday Reminder! As massage therapists, we spend our days caring for others. But remember - you cannot pour from an empty cup. This week, take time for YOUR wellness. Connect with a fellow therapist, share your experiences, and support each other.\n\nJoin the conversation in our Self-Care community group!',
    image:
      'https://readdy.ai/api/search-image?query=massage%20therapist%20receiving%20relaxing%20massage%20from%20colleague%20self%20care%20wellness%20professional%20spa%20setting%20peaceful%20atmosphere&width=800&height=450&seq=fp31&orientation=landscape',
    reactions: { like: 1200, love: 340, care: 156 },
    comments: 289,
    shares: 567,
  },
  {
    id: 3,
    user: {
      name: 'Marcus Johnson, CMT',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20african%20american%20male%20massage%20therapist%20friendly%20expression%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt2&orientation=squarish',
    },
    time: '5 hours ago',
    privacy: 'friends',
    content:
      "Finally set up my new private practice space! 🧑‍💼 After 5 years working in spas, I took the leap. The journey was scary but so worth it. Any tips from fellow practice owners? Would love to connect with other therapists who've made this transition.",
    images: [
      'https://readdy.ai/api/search-image?query=modern%20massage%20therapy%20private%20practice%20room%20with%20professional%20massage%20table%20warm%20lighting%20plants%20clean%20minimalist%20design&width=400&height=400&seq=fp32&orientation=squarish',
      'https://readdy.ai/api/search-image?query=massage%20therapy%20reception%20area%20waiting%20room%20with%20comfortable%20seating%20calming%20decor%20professional%20wellness%20office&width=400&height=400&seq=fp33&orientation=squarish',
      'https://readdy.ai/api/search-image?query=massage%20therapy%20supplies%20organized%20on%20shelves%20oils%20lotions%20towels%20professional%20spa%20storage&width=400&height=400&seq=fp34&orientation=squarish',
      'https://readdy.ai/api/search-image?query=massage%20therapy%20treatment%20room%20with%20hot%20towel%20warmer%20and%20essential%20oil%20diffuser%20cozy%20professional%20atmosphere&width=400&height=400&seq=fp35&orientation=squarish',
    ],
    reactions: { like: 567, love: 123, care: 34 },
    comments: 89,
    shares: 23,
  },
  {
    id: 4,
    user: {
      name: 'Emily Rodriguez, LMT',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20latina%20woman%20massage%20therapist%20cheerful%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt3&orientation=squarish',
    },
    time: '8 hours ago',
    privacy: 'public',
    content:
      "Had the most rewarding session today with a client who's been dealing with chronic tension headaches for years. After 6 sessions focusing on neck and shoulder work combined with trigger point therapy, she reported her first headache‑free week in over a decade! 😭 This is why we do what we do. #MassageTherapy #ChronicPain #HealingHands",
    image:
      'https://readdy.ai/api/search-image?query=massage%20therapist%20performing%20neck%20and%20shoulder%20massage%20treatment%20professional%20therapeutic%20setting%20warm%20lighting&width=800&height=600&seq=fp36&orientation=landscape',
    reactions: { like: 892, love: 456, care: 78 },
    comments: 234,
    shares: 89,
  },
  {
    id: 5,
    user: {
      name: 'David Kim, NCTMB',
      avatar:
        'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20korean%20american%20male%20massage%20therapist%20casual%20style%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt4&orientation=squarish',
    },
    time: '1 day ago',
    privacy: 'public',
    content:
      "Looking to connect with massage therapists in the Denver area! I specialize in sports massage and myofascial release. Would love to network, share referrals, and build our local community. DM me if you're in the area! 🤝 #Denver #MassageTherapistCommunity #Networking",
    reactions: { like: 156, love: 23, care: 8 },
    comments: 42,
    shares: 31,
  },
];

export const contacts = [
  {
    id: 1,
    name: 'Sarah Chen, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20asian%20woman%20massage%20therapist%20smiling%20warmly%20wearing%20scrubs%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt1&orientation=squarish',
    online: true,
  },
  {
    id: 2,
    name: 'Marcus Johnson, CMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20african%20american%20male%20massage%20therapist%20friendly%20expression%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt2&orientation=squarish',
    online: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20latina%20woman%20massage%20therapist%20cheerful%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt3&orientation=squarish',
    online: true,
  },
  {
    id: 4,
    name: 'David Kim, NCTMB',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20korean%20american%20male%20massage%20therapist%20casual%20style%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt4&orientation=squarish',
    online: false,
  },
  {
    id: 5,
    name: 'Lisa Thompson, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20woman%20massage%20therapist%20with%20glasses%20friendly%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt5&orientation=squarish',
    online: true,
  },
  {
    id: 6,
    name: 'Robert Williams, CMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20middle%20aged%20man%20massage%20therapist%20distinguished%20look%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt6&orientation=squarish',
    online: false,
  },
  {
    id: 7,
    name: 'Amanda Foster, LMT',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20woman%20with%20curly%20red%20hair%20massage%20therapist%20bright%20smile%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt7&orientation=squarish',
    online: true,
  },
  {
    id: 8,
    name: 'Carlos Martinez, NCTMB',
    avatar:
      'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20latino%20man%20massage%20therapist%20in%20his%2020s%20friendly%20expression%20clean%20background%20portrait%20photography&width=100&height=100&seq=mt8&orientation=squarish',
    online: false,
  },
];

export const shortcuts = [
  {
    id: 1,
    name: 'Deep Tissue Therapists',
    image:
      'https://readdy.ai/api/search-image?query=deep%20tissue%20massage%20therapy%20icon%20with%20hands%20and%20muscle%20illustration%20modern%20design%20teal%20color&width=100&height=100&seq=sc50&orientation=squarish',
  },
  {
    id: 2,
    name: 'Sports Massage Network',
    image:
      'https://readdy.ai/api/search-image?query=sports%20massage%20therapy%20community%20icon%20with%20athletic%20figure%20modern%20design%20professional&width=100&height=100&seq=sc51&orientation=squarish',
  },
  {
    id: 3,
    name: 'Prenatal MT Support',
    image:
      'https://readdy.ai/api/search-image?query=prenatal%20massage%20therapy%20icon%20with%20gentle%20caring%20hands%20soft%20colors%20professional%20design&width=100&height=100&seq=sc52&orientation=squarish',
  },
  {
    id: 4,
    name: 'Business Building for MTs',
    image:
      'https://readdy.ai/api/search-image?query=massage%20therapy%20business%20growth%20icon%20with%20chart%20and%20hands%20professional%20modern%20design&width=100&height=100&seq=sc53&orientation=squarish',
  },
];
