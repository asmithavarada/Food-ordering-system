import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Clock, Leaf } from 'lucide-react';
import { Food } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import FallbackImage from './FallbackImage';

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addItem } = useCartStore();
  const { addToast, isDarkMode } = useUIStore();

  const handleAddToCart = () => {
    addItem(food);
    addToast({
      type: 'success',
      message: `${food.name} added to cart!`,
      duration: 2000,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="relative">
        <FallbackImage
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          {food.category === 'veg' ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Leaf size={12} />
              Veg
            </div>
          ) : (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Non-Veg
            </div>
          )}
        </div>

        {/* Bestseller Badge */}
        {food.isBestseller && (
          <div className="absolute top-3 right-3">
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ⭐ Bestseller
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {food.rating && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {food.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-bold text-lg ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {food.name}
          </h3>
          <div className="text-right">
            <p className="text-xl font-bold text-orange-500">
              ₹{food.price}
            </p>
          </div>
        </div>

        <p className={`text-sm mb-2 line-clamp-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {food.description || 'Delicious food prepared with fresh ingredients'}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {food.prepTime && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {food.prepTime} mins
              </div>
            )}
          </div>
          <div className={`text-xs font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {food.restaurantName}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
