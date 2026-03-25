import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, HelpCircle, LogOut, MessageCircle, Send, X, Package } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const Profile: React.FC = () => {
  const { orders } = useCartStore();
  const { isDarkMode, toggleDarkMode, addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'settings' | 'support'>('info');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Food Street, Delhi, India',
    memberSince: 'January 2024',
    totalOrders: orders.length,
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
      
      // Simulate support response
      setTimeout(() => {
        const supportResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message! Our team will get back to you soon.',
          sender: 'support',
          timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, supportResponse]);
      }, 1000);
    }
  };

  const handleLogout = () => {
    addToast({
      type: 'info',
      message: 'Logged out successfully',
      duration: 2000,
    });
    window.location.href = '/';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Profile
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex flex-col items-center mb-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <User size={40} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </div>
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {mockUser.name}
                </h2>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Member since {mockUser.memberSince}
                </p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'info', label: 'User Info', icon: User },
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'settings', label: 'Settings', icon: Settings },
                  { id: 'support', label: 'Help & Support', icon: HelpCircle },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}

                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-red-400 hover:bg-gray-700'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className={`text-xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      User Information
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Name', value: mockUser.name },
                        { label: 'Email', value: mockUser.email },
                        { label: 'Phone', value: mockUser.phone },
                        { label: 'Address', value: mockUser.address },
                        { label: 'Total Orders', value: mockUser.totalOrders.toString() },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        >
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                            {item.label}
                          </span>
                          <span className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className={`text-xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      My Orders
                    </h3>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package
                          size={48}
                          className={`mx-auto mb-3 ${
                            isDarkMode ? 'text-gray-700' : 'text-gray-300'
                          }`}
                        />
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          No orders yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div
                            key={order.id}
                            className={`p-4 rounded-lg border ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className={`font-semibold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  Order #{order.id}
                                </p>
                                <p className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {order.items.length} items • ₹{order.total.toFixed(2)}
                                </p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                order.status === 'delivered'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {formatDate(order.timestamp)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className={`text-xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Settings
                    </h3>
                    <div className="space-y-4">
                      <div className={`flex justify-between items-center p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div>
                          <p className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Dark Mode
                          </p>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Toggle dark mode theme
                          </p>
                        </div>
                        <button
                          onClick={toggleDarkMode}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isDarkMode ? 'bg-orange-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isDarkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'support' && (
                  <motion.div
                    key="support"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className={`text-xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Help & Support
                    </h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        Start Chat
                      </button>
                      
                      <div className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <h4 className={`font-medium mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          FAQs
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            Q: How can I track my order?
                          </p>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            A: You can track your order from the Orders section.
                          </p>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            Q: How do I cancel an order?
                          </p>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            A: Contact support immediately for order cancellation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-2xl shadow-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`p-4 border-b flex justify-between items-center ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Customer Support
                </h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className={`p-1 rounded-full transition-colors ${
                    isDarkMode
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-orange-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.text}
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-orange-100'
                          : isDarkMode
                          ? 'text-gray-500'
                          : 'text-gray-500'
                      }`}>
                        {formatDate(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-900'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
