export const userGroups = [
  {
    id: 1,
    name: 'Mental Health Support Community',
    coverImage: 'https://readdy.ai/api/search-image?query=peaceful%20serene%20mental%20wellness%20community%20support%20group%20therapy%20calming%20blue%20tones%20soft%20lighting%20minimalist%20clean%20background%20abstract%20gentle%20waves&width=800&height=400&seq=101&orientation=landscape',
    memberCount: 12847,
    privacy: 'Public',
    category: 'Health',
    description: 'A safe space for mental health discussions and peer support',
    lastActivity: '2 hours ago',
    isJoined: true
  },
  {
    id: 2,
    name: 'Therapy Techniques & Resources',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20therapy%20counseling%20resources%20books%20journals%20peaceful%20study%20space%20warm%20lighting%20minimalist%20clean%20background%20soft%20tones%20calming%20atmosphere&width=800&height=400&seq=102&orientation=landscape',
    memberCount: 8934,
    privacy: 'Private',
    category: 'Health',
    description: 'Share and learn evidence-based therapy techniques',
    lastActivity: '5 hours ago',
    isJoined: true
  },
  {
    id: 3,
    name: 'Mindfulness & Meditation',
    coverImage: 'https://readdy.ai/api/search-image?query=zen%20meditation%20mindfulness%20peaceful%20nature%20scene%20soft%20morning%20light%20minimalist%20clean%20background%20calming%20green%20tones%20tranquil%20atmosphere%20serene%20landscape&width=800&height=400&seq=103&orientation=landscape',
    memberCount: 15623,
    privacy: 'Public',
    category: 'Health',
    description: 'Daily mindfulness practices and meditation guidance',
    lastActivity: '1 day ago',
    isJoined: true
  }
];

export const suggestedGroups = [
  {
    id: 4,
    name: 'Anxiety & Stress Management',
    coverImage: 'https://readdy.ai/api/search-image?query=calm%20peaceful%20stress%20relief%20relaxation%20techniques%20soft%20pastel%20colors%20minimalist%20clean%20background%20gentle%20abstract%20shapes%20soothing%20atmosphere&width=800&height=400&seq=104&orientation=landscape',
    memberCount: 9876,
    privacy: 'Public',
    category: 'Health',
    description: 'Techniques and support for managing anxiety and stress',
    mutualMembers: 23,
    isJoined: false
  },
  {
    id: 5,
    name: 'Depression Support Network',
    coverImage: 'https://readdy.ai/api/search-image?query=hope%20recovery%20support%20community%20warm%20comforting%20light%20soft%20colors%20minimalist%20clean%20background%20gentle%20uplifting%20atmosphere%20peaceful%20scene&width=800&height=400&seq=105&orientation=landscape',
    memberCount: 11234,
    privacy: 'Private',
    category: 'Health',
    description: 'Understanding and overcoming depression together',
    mutualMembers: 18,
    isJoined: false
  },
  {
    id: 6,
    name: 'Self-Care & Wellness',
    coverImage: 'https://readdy.ai/api/search-image?query=self%20care%20wellness%20spa%20relaxation%20healthy%20lifestyle%20soft%20natural%20light%20minimalist%20clean%20background%20calming%20pastel%20tones%20peaceful%20atmosphere&width=800&height=400&seq=106&orientation=landscape',
    memberCount: 14567,
    privacy: 'Public',
    category: 'Health',
    description: 'Tips and inspiration for daily self-care routines',
    mutualMembers: 31,
    isJoined: false
  },
  {
    id: 7,
    name: 'Cognitive Behavioral Therapy (CBT)',
    coverImage: 'https://readdy.ai/api/search-image?query=cognitive%20therapy%20mental%20health%20professional%20learning%20education%20soft%20lighting%20minimalist%20clean%20background%20calming%20blue%20tones%20structured%20organized%20atmosphere&width=800&height=400&seq=107&orientation=landscape',
    memberCount: 7892,
    privacy: 'Public',
    category: 'Health',
    description: 'Learn and practice CBT techniques for better mental health',
    mutualMembers: 12,
    isJoined: false
  },
  {
    id: 8,
    name: 'Trauma Recovery & Healing',
    coverImage: 'https://readdy.ai/api/search-image?query=healing%20recovery%20growth%20new%20beginnings%20soft%20warm%20light%20minimalist%20clean%20background%20gentle%20pastel%20colors%20hopeful%20peaceful%20atmosphere&width=800&height=400&seq=108&orientation=landscape',
    memberCount: 6543,
    privacy: 'Private',
    category: 'Health',
    description: 'A compassionate space for trauma survivors',
    mutualMembers: 8,
    isJoined: false
  },
  {
    id: 9,
    name: 'ADHD Support & Strategies',
    coverImage: 'https://readdy.ai/api/search-image?query=focus%20concentration%20productivity%20organization%20colorful%20structured%20minimalist%20clean%20background%20energetic%20positive%20atmosphere%20vibrant%20soft%20tones&width=800&height=400&seq=109&orientation=landscape',
    memberCount: 10234,
    privacy: 'Public',
    category: 'Health',
    description: 'Support and practical strategies for living with ADHD',
    mutualMembers: 15,
    isJoined: false
  }
];

export const allGroups = [
  ...userGroups,
  ...suggestedGroups,
  {
    id: 10,
    name: 'Art Therapy & Creative Expression',
    coverImage: 'https://readdy.ai/api/search-image?query=art%20therapy%20creative%20expression%20painting%20drawing%20colorful%20artistic%20minimalist%20clean%20background%20vibrant%20soft%20colors%20inspiring%20atmosphere&width=800&height=400&seq=110&orientation=landscape',
    memberCount: 8765,
    privacy: 'Public',
    category: 'Health',
    description: 'Healing through creative arts and expression',
    isJoined: false
  },
  {
    id: 11,
    name: 'Sleep & Insomnia Support',
    coverImage: 'https://readdy.ai/api/search-image?query=peaceful%20sleep%20night%20rest%20relaxation%20dark%20blue%20purple%20tones%20minimalist%20clean%20background%20calming%20serene%20atmosphere%20gentle%20moonlight&width=800&height=400&seq=111&orientation=landscape',
    memberCount: 9123,
    privacy: 'Public',
    category: 'Health',
    description: 'Better sleep habits and insomnia management',
    isJoined: false
  },
  {
    id: 12,
    name: 'Relationship & Family Therapy',
    coverImage: 'https://readdy.ai/api/search-image?query=family%20relationships%20connection%20love%20support%20warm%20lighting%20minimalist%20clean%20background%20soft%20warm%20tones%20caring%20peaceful%20atmosphere&width=800&height=400&seq=112&orientation=landscape',
    memberCount: 11876,
    privacy: 'Private',
    category: 'Social',
    description: 'Strengthening relationships through therapy',
    isJoined: false
  },
  {
    id: 13,
    name: 'Eating Disorder Recovery',
    coverImage: 'https://readdy.ai/api/search-image?query=healthy%20eating%20recovery%20wellness%20nutrition%20balance%20soft%20natural%20light%20minimalist%20clean%20background%20gentle%20pastel%20colors%20hopeful%20atmosphere&width=800&height=400&seq=113&orientation=landscape',
    memberCount: 5432,
    privacy: 'Private',
    category: 'Health',
    description: 'Support for eating disorder recovery journey',
    isJoined: false
  },
  {
    id: 14,
    name: 'Grief & Loss Support',
    coverImage: 'https://readdy.ai/api/search-image?query=grief%20support%20healing%20remembrance%20peaceful%20memorial%20soft%20gentle%20light%20minimalist%20clean%20background%20calming%20muted%20tones%20compassionate%20atmosphere&width=800&height=400&seq=114&orientation=landscape',
    memberCount: 7654,
    privacy: 'Public',
    category: 'Health',
    description: 'Finding comfort and healing after loss',
    isJoined: false
  },
  {
    id: 15,
    name: 'Addiction Recovery Community',
    coverImage: 'https://readdy.ai/api/search-image?query=recovery%20sobriety%20strength%20hope%20new%20beginning%20sunrise%20soft%20warm%20light%20minimalist%20clean%20background%20uplifting%20positive%20atmosphere&width=800&height=400&seq=115&orientation=landscape',
    memberCount: 13245,
    privacy: 'Private',
    category: 'Health',
    description: 'Supporting each other in recovery',
    isJoined: false
  }
];

export const categories = [
  { id: 'all', name: 'All Groups', icon: 'ri-apps-2-line' },
  { id: 'health', name: 'Health', icon: 'ri-heart-pulse-line' },
  { id: 'social', name: 'Social', icon: 'ri-group-line' },
  { id: 'gaming', name: 'Gaming', icon: 'ri-gamepad-line' },
  { id: 'business', name: 'Business', icon: 'ri-briefcase-line' },
  { id: 'education', name: 'Education', icon: 'ri-book-line' },
  { id: 'hobbies', name: 'Hobbies', icon: 'ri-palette-line' }
];
