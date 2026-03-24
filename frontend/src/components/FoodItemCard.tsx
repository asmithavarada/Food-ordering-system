import React from 'react';
import { FoodItem } from '../types';
import { Plus, Leaf } from 'lucide-react';

interface FoodItemCardProps {
  foodItem: FoodItem;
  onAddToCart: (foodItem: FoodItem) => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ foodItem, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex gap-4">
        <img 
          src={foodItem.imageUrl || `https://picsum.photos/seed/${foodItem.name}/100/100.jpg`}
          alt={foodItem.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{foodItem.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{foodItem.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {foodItem.isVeg && (
                  <div className="flex items-center gap-1">
                    <Leaf className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Veg</span>
                  </div>
                )}
                {foodItem.isBestseller && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Bestseller
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">₹{foodItem.price}</p>
              <button
                onClick={() => onAddToCart(foodItem)}
                className="mt-2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
