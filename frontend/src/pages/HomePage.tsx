import React, { useState, useEffect } from 'react';
import { Restaurant } from '../types';
import { restaurantService } from '../services/restaurantService';
import RestaurantCard from '../components/RestaurantCard';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime'>('rating');
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [restaurants, searchQuery, selectedFilter, sortBy]);

  const loadRestaurants = async () => {
    try {
      const data = await restaurantService.getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...restaurants];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply veg/non-veg filter
    if (selectedFilter === 'veg') {
      filtered = filtered.filter(restaurant => restaurant.isVeg);
    } else if (selectedFilter === 'nonveg') {
      filtered = filtered.filter(restaurant => !restaurant.isVeg);
    }

    // Apply sorting
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      // Extract numbers from delivery time strings (e.g., "30-40 min" -> 30)
      const extractMinTime = (time: string) => {
        const match = time.match(/(\d+)/);
        return match ? parseInt(match[0]) : 999;
      };
      filtered.sort((a, b) => extractMinTime(a.deliveryTime) - extractMinTime(b.deliveryTime));
    }

    setFilteredRestaurants(filtered);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItemCount={getCartCount()} onCartClick={handleCartClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-orange-500">FoodOrdering</h1>
          <p className="text-gray-600">
            Order from your favorite restaurants
          </p>
          <p className="text-gray-600">
            Discover the best food in your city
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Restaurants</option>
                <option value="veg">Pure Veg</option>
                <option value="nonveg">Non-Veg</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="deliveryTime">Sort by Delivery Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
