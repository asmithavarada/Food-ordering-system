import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Restaurant, FoodItem, CartItem } from '../types';
import { restaurantService, foodItemService } from '../services/restaurantService';
import Navbar from '../components/Navbar';
import FoodItemCard from '../components/FoodItemCard';
import { useCart } from '../contexts/CartContext';
import { Search, Star, Clock, MapPin } from 'lucide-react';

const RestaurantMenuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, getCartCount } = useCart();

  useEffect(() => {
    if (id) {
      loadRestaurantData(id);
    } else {
      setError('No restaurant ID provided');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    applyFilters();
  }, [foodItems, searchQuery, selectedFilter]);

  const loadRestaurantData = async (restaurantId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading restaurant data for ID:', restaurantId);
      
      const [restaurantData, menuData] = await Promise.all([
        restaurantService.getRestaurantById(Number(restaurantId)),
        foodItemService.getFoodItemsByRestaurant(Number(restaurantId))
      ]);
      
      console.log('Restaurant data:', restaurantData);
      console.log('Menu data:', menuData);
      
      setRestaurant(restaurantData);
      setFoodItems(menuData);
    } catch (error) {
      console.error('Failed to load restaurant data:', error);
      setError('Failed to load restaurant menu. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...foodItems];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply veg/non-veg filter
    if (selectedFilter === 'veg') {
      filtered = filtered.filter(item => item.isVeg);
    } else if (selectedFilter === 'nonveg') {
      filtered = filtered.filter(item => !item.isVeg);
    }

    setFilteredFoodItems(filtered);
  };

  const handleAddToCart = (foodItem: FoodItem) => {
    const cartItem: CartItem = {
      foodItemId: foodItem.id,
      foodItemName: foodItem.name,
      foodItemPrice: foodItem.price,
      quantity: 1,
      imageUrl: foodItem.imageUrl,
      isVeg: foodItem.isVeg
    };
    addToCart(cartItem);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar cartItemCount={getCartCount()} onCartClick={() => {}} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <div className="text-gray-500">Loading restaurant menu...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar cartItemCount={getCartCount()} onCartClick={() => {}} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Error Loading Menu
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
              {id && (
                <button
                  onClick={() => loadRestaurantData(id)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar cartItemCount={getCartCount()} onCartClick={() => {}} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🏪</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Restaurant Not Found
            </h2>
            <p className="text-gray-500 mb-4">
              The restaurant you're looking for doesn't exist
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItemCount={getCartCount()} onCartClick={() => {}} />
      
      {/* Restaurant Header */}
      <div className="relative">
        <img 
          src={restaurant.imageUrl || `https://picsum.photos/seed/${restaurant.name}/1200/300.jpg`}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-xl">{restaurant.cuisine} • {restaurant.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="ml-1 font-semibold text-lg">{restaurant.rating}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-1">{restaurant.deliveryTime}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="ml-1">{restaurant.location}</span>
              </div>
            </div>
            
            {restaurant.isVeg && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                Pure Veg
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'veg' | 'nonveg')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Items</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="space-y-4">
          {filteredFoodItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your criteria</p>
            </div>
          ) : (
            filteredFoodItems.map((foodItem) => (
              <FoodItemCard
                key={foodItem.id}
                foodItem={foodItem}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
