import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Food, FormData } from '../types';
import { useUIStore } from '../store/useUIStore';

interface AddFoodFormProps {
  onAddFood: (food: Food) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    foodName: '',
    category: 'veg',
    price: '',
    imageUrl: '',
    restaurantName: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { isDarkMode, addToast } = useUIStore();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.foodName.trim()) {
      newErrors.foodName = 'Food name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newFood: Food = {
      id: `food-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: formData.foodName,
      category: formData.category,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      restaurantName: formData.restaurantName,
      restaurantId: `rest-${Date.now()}`,
      description: `Delicious ${formData.category} food from ${formData.restaurantName}`,
      rating: 4.0 + Math.random(),
      prepTime: 20 + Math.floor(Math.random() * 40),
      isBestseller: Math.random() > 0.7,
    };

    onAddFood(newFood);
    addToast({
      type: 'success',
      message: `${newFood.name} added successfully!`,
      duration: 3000,
    });

    setFormData({
      foodName: '',
      category: 'veg',
      price: '',
      imageUrl: '',
      restaurantName: '',
    });
    setErrors({});
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30"
      >
        <Plus size={24} />
      </motion.button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-md rounded-2xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Add New Food Item
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Food Name *
            </label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                errors.foodName
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter food name"
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm mt-1">{errors.foodName}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="veg">🟢 Vegetarian</option>
              <option value="non-veg">🔴 Non-Vegetarian</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                errors.price
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Image URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                errors.imageUrl
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Restaurant Name *
            </label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                errors.restaurantName
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter restaurant name"
            />
            {errors.restaurantName && (
              <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              Add Food Item
            </motion.button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFoodForm;
