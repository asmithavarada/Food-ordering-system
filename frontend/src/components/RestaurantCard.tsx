import React from 'react';
import { Restaurant } from '../types';
import { Star, Clock, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="relative">
        <img 
          src={restaurant.imageUrl || `https://picsum.photos/seed/${restaurant.name}/300/200.jpg`}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {restaurant.offerBadge && (
          <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
            {restaurant.offerBadge}
          </div>
        )}
        {restaurant.isVeg && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
            PURE VEG
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{restaurant.name}</h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 font-medium">{restaurant.rating}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="ml-1">{restaurant.deliveryTime} min</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="ml-1">{restaurant.location}</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {restaurant.cuisine}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
