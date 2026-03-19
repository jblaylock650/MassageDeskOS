
import { useState } from 'react';
import Header from '../../components/feature/Header';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const conversations: Conversation[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20portrait%20headshot%20smiling%20friendly%20warm%20expression%20simple%20clean%20white%20background%20natural%20lighting%20approachable%20confident%20modern%20style&width=100&height=100&seq=msg1&orientation=squarish',
      online: true
    },
    lastMessage: 'That sounds great! Let me know when you\'re free.',
    timestamp: '2m',
    unread: 2
  },
  {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20man%20portrait%20headshot%20smiling%20friendly%20business%20casual%20simple%20clean%20white%20background%20natural%20lighting%20approachable%20confident%20modern%20style&width=100&height=100&seq=msg2&orientation=squarish',
      online: true
    },
    lastMessage: 'Thanks for sharing that article!',
    timestamp: '15m',
    unread: 0
  },
  {
    id: '3',
    user: {
      name: 'Emily Rodriguez',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20latina%20woman%20portrait%20headshot%20smiling%20warm%20friendly%20simple%20clean%20white%20background%20natural%20lighting%20approachable%20confident%20modern%20style&width=100&height=100&seq=msg3&orientation=squarish',
      online: false
    },
    lastMessage: 'See you tomorrow!',
    timestamp: '1h',
    unread: 0
  },
  {
    id: '4',
    user: {
      name: 'David Park',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20man%20portrait%20headshot%20smiling%20friendly%20business%20attire%20simple%20clean%20white%20background%20natural%20lighting%20approachable%20confident%20modern%20style&width=100&height=100&seq=msg4&orientation=squarish',
      online: false
    },
    lastMessage: 'I\'ll send you the files later today.',
    timestamp: '3h',
    unread: 0
  },
  {
    id: '5',
    user: {
      name: 'Jessica Williams',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20portrait%20headshot%20smiling%20friendly%20warm%20expression%20business%20casual%20simple%20clean%20white%20background%20natural%20lighting%20approachable%20modern%20style&width=100&height=100&seq=msg5&orientation=squarish',
      online: true
    },
    lastMessage: 'Perfect! Talk soon.',
    timestamp: '5h',
    unread: 0
  },
  {
    id: '6',
    user: {
      name: 'Robert Taylor',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20man%20portrait%20headshot%20smiling%20friendly%20confident%20simple%20clean%20white%20background%20natural%20lighting%20approachable%20business%20casual%20modern%20style&width=100&height=100&seq=msg6&orientation=squarish',
      online: false
    },
    lastMessage: 'Got it, thanks!',
    timestamp: '1d',
    unread: 0
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    sender: 'other',
    timestamp: '10:30 AM',
    read: true
  },
  {
    id: '2',
    text: 'I\'m doing great! Just finished a project I\'ve been working on.',
    sender: 'me',
    timestamp: '10:32 AM',
    read: true
  },
  {
    id: '3',
    text: 'That\'s awesome! What was the project about?',
    sender: 'other',
    timestamp: '10:33 AM',
    read: true
  },
  {
    id: '4',
    text: 'It was a new feature for our app. Took a while but really happy with how it turned out.',
    sender: 'me',
    timestamp: '10:35 AM',
    read: true
  },
  {
    id: '5',
    text: 'I\'d love to hear more about it! Are you free for a call later?',
    sender: 'other',
    timestamp: '10:36 AM',
    read: true
  },
  {
    id: '6',
    text: 'That sounds great! Let me know when you\'re free.',
    sender: 'other',
    timestamp: '10:37 AM',
    read: true
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯', '🙌', '👏', '😍', '🥰', '😎', '🤔', '👋', '💪'];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        read: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setShowEmojiPicker(false);

      // Simulate typing indicator
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const reply: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Thanks for your message! I\'ll get back to you soon.',
            sender: 'other',
            timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            read: false
          };
          setMessages(prev => [...prev, reply]);
        }, 2000);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)] mt-16">
        {/* Conversations Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                <i className="ri-edit-line text-xl text-gray-700"></i>
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedConversation.id === conv.id ? 'bg-gray-100' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.user.avatar}
                    alt={conv.user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conv.user.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{conv.user.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      {conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <span className="ml-2 w-5 h-5 flex items-center justify-center bg-rose-500 text-white text-xs rounded-full flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedConversation.user.avatar}
                  alt={selectedConversation.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {selectedConversation.user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedConversation.user.name}</h2>
                <p className="text-xs text-gray-500">
                  {selectedConversation.user.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                <i className="ri-phone-line text-xl text-rose-500"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                <i className="ri-vidicon-line text-xl text-rose-500"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                <i className="ri-information-line text-xl text-gray-600"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-md ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'other' && (
                    <img
                      src={selectedConversation.user.avatar}
                      alt={selectedConversation.user.name}
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.sender === 'me' && (
                        <i className={`ri-check-double-line text-xs ${message.read ? 'text-rose-500' : 'text-gray-400'}`}></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <img
                    src={selectedConversation.user.avatar}
                    alt={selectedConversation.user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-end gap-2">
              <div className="flex gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                  <i className="ri-add-circle-line text-2xl text-rose-500"></i>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                  <i className="ri-image-line text-xl text-amber-500"></i>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                  <i className="ri-attachment-line text-xl text-rose-500"></i>
                </button>
              </div>

              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-2 pr-12 bg-gray-100 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                >
                  <i className="ri-emotion-line text-xl text-gray-500"></i>
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                    <div className="grid grid-cols-8 gap-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setNewMessage(newMessage + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer text-xl"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  newMessage.trim()
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600'
                    : 'bg-gray-200 cursor-not-allowed'
                }`}
              >
                <i className={`ri-send-plane-fill text-lg ${newMessage.trim() ? 'text-white' : 'text-gray-400'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
