import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Moon, Sun, Package, Home, User } from 'lucide-react';
import Logo from './Logo';
import { useUIStore } from '../store/useUIStore';
import { useCartTotals } from '../store/useCartStore';

const Navbar: React.FC = () => {
  const {
    isDarkMode,
    searchQuery,
    selectedCategory,
    toggleDarkMode,
    setSearchQuery,
    setSelectedCategory,
    toggleCart,
  } = useUIStore();

  const totals = useCartTotals();
  const totalItems = totals.totalItems;

  const handleProfileClick = () => {
    window.location.href = '/profile';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-900/90 border-gray-700'
          : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="medium" />

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for food or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('veg')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'veg'
                  ? 'bg-green-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🟢 Veg
            </button>
            <button
              onClick={() => setSelectedCategory('non-veg')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'non-veg'
                  ? 'bg-red-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔴 Non-Veg
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Home"
            >
              <Home size={20} />
            </button>

            <button
              onClick={handleProfileClick}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Profile"
            >
              <User size={20} />
            </button>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => window.location.href = '/orders'}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="View Orders"
            >
              <Package size={20} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <AnimatePresence>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                </AnimatePresence>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for food or restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 mt-3 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('veg')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === 'veg'
                  ? 'bg-green-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🟢 Veg
            </button>
            <button
              onClick={() => setSelectedCategory('non-veg')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === 'non-veg'
                  ? 'bg-red-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔴 Non-Veg
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
