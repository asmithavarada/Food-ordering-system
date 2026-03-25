import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';
import { sampleRestaurants, sampleFoods } from '../data/sampleData';
import { useUIStore } from '../store/useUIStore';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'foods'>('restaurants');
  const { searchQuery, selectedCategory, isDarkMode } = useUIStore();

  const filteredRestaurants = useMemo(() => {
    return sampleRestaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             restaurant.category === selectedCategory ||
                             restaurant.category === 'both';
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredFoods = useMemo(() => {
    return sampleFoods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           food.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Food Ordering System,
              <br />
              Delivered Fast
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              Order from your favorite restaurants
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex rounded-lg p-1 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'
          }`}>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'restaurants'
                  ? 'bg-orange-500 text-white'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('foods')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'foods'
                  ? 'bg-orange-500 text-white'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Food Items
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {activeTab === 'restaurants' 
                    ? `${filteredRestaurants.length} restaurants found`
                    : `${filteredFoods.length} food items found`
                  }
                </span>
              </div>
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="flex items-center gap-2 text-sm">
                  <Search size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {searchQuery && `"${searchQuery}"`}
                    {searchQuery && selectedCategory !== 'all' && ' • '}
                    {selectedCategory !== 'all' && selectedCategory}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        {activeTab === 'restaurants' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  foods={sampleFoods}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  No restaurants found
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-6xl mb-4">🍕</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  No food items found
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
