import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Restaurant, Food } from '../types';
import FoodCard from './FoodCard';
import { useUIStore } from '../store/useUIStore';
import FallbackImage from './FallbackImage';

interface RestaurantCardProps {
  restaurant: Restaurant;
  foods: Food[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, foods }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDarkMode } = useUIStore();

  const restaurantFoods = foods.filter(food => food.restaurantId === restaurant.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="relative">
        <FallbackImage
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        
        {restaurant.offerBadge && (
          <div className="absolute top-3 left-3">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {restaurant.offerBadge}
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3">
          {restaurant.category === 'veg' ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              🟢 Pure Veg
            </div>
          ) : restaurant.category === 'non-veg' ? (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              🔴 Non-Veg
            </div>
          ) : (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              🍽️ Both
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className={`font-bold text-xl mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {restaurant.name}
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {restaurant.cuisine}
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <Star size={16} className="fill-green-600 text-green-600" />
              <span className="font-bold text-green-600">{restaurant.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className={`flex items-center gap-1 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Clock size={16} />
            {restaurant.deliveryTime}
          </div>
          
          {restaurant.location && (
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              📍 {restaurant.location}
            </div>
          )}
        </div>

        {restaurantFoods.length > 0 && (
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>View Menu ({restaurantFoods.length} items)</span>
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    {restaurantFoods.map((food) => (
                      <FoodCard key={food.id} food={food} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
