package com.foodordering.service;

import com.foodordering.model.Restaurant;
import com.foodordering.model.FoodItem;
import com.foodordering.repository.RestaurantRepository;
import com.foodordering.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @Autowired
    private FoodItemRepository foodItemRepository;

    @Override
    public void run(String... args) throws Exception {
        if (restaurantRepository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        // Create restaurants
        Restaurant restaurant1 = new Restaurant();
        restaurant1.setName("Pizza Palace");
        restaurant1.setCuisine("Italian");
        restaurant1.setLocation("Downtown");
        restaurant1.setRating(4.5);
        restaurant1.setImageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400");
        restaurant1.setIsVeg(false);
        restaurant1.setDeliveryTime("30-40 min");
        Restaurant savedRestaurant1 = restaurantRepository.save(restaurant1);

        Restaurant restaurant2 = new Restaurant();
        restaurant2.setName("Burger Barn");
        restaurant2.setCuisine("American");
        restaurant2.setLocation("City Center");
        restaurant2.setRating(4.2);
        restaurant2.setImageUrl("https://images.unsplash.com/photo-1568901346375-23c9d0c24e17?w=400");
        restaurant2.setIsVeg(false);
        restaurant2.setDeliveryTime("25-35 min");
        Restaurant savedRestaurant2 = restaurantRepository.save(restaurant2);

        Restaurant restaurant3 = new Restaurant();
        restaurant3.setName("Veggie Delight");
        restaurant3.setCuisine("Vegetarian");
        restaurant3.setLocation("Green Valley");
        restaurant3.setRating(4.8);
        restaurant3.setImageUrl("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400");
        restaurant3.setIsVeg(true);
        restaurant3.setDeliveryTime("20-30 min");
        Restaurant savedRestaurant3 = restaurantRepository.save(restaurant3);

        // Add food items for each restaurant
        addFoodItems(savedRestaurant1, new String[][]{
            {"Margherita Pizza", "299.00", "Classic cheese pizza with tomato sauce", "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300", "false"},
            {"Pepperoni Pizza", "399.00", "Pepperoni and mozzarella cheese", "https://images.unsplash.com/photo-1628842948301-86a0c5d9b9b4?w=300", "false"},
            {"Veggie Supreme", "349.00", "Loaded with fresh vegetables", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300", "true"}
        });

        addFoodItems(savedRestaurant2, new String[][]{
            {"Classic Burger", "249.00", "Juicy beef patty with lettuce", "https://images.unsplash.com/photo-1568901346375-23c9d0c24e17?w=300", "false"},
            {"Cheese Burger", "299.00", "Double cheese with beef patty", "https://images.unsplash.com/photo-1606755966936-32b643bb463d?w=300", "false"},
            {"Veggie Burger", "229.00", "Plant-based patty with veggies", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", "true"}
        });

        addFoodItems(savedRestaurant3, new String[][]{
            {"Paneer Tikka", "329.00", "Grilled cottage cheese with spices", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", "true"},
            {"Dal Makhani", "279.00", "Creamy black lentils with butter", "https://images.unsplash.com/photo-1586190848861-99aa4a171e908?w=300", "true"},
            {"Veg Biryani", "259.00", "Fragrant rice with mixed vegetables", "https://images.unsplash.com/photo-1563379091339-03246963d333?w=300", "true"}
        });
    }

    private void addFoodItems(Restaurant restaurant, String[][] itemsData) {
        for (String[] itemData : itemsData) {
            FoodItem foodItem = new FoodItem();
            foodItem.setRestaurantId(restaurant.getId());
            foodItem.setName(itemData[0]);
            foodItem.setPrice(Double.parseDouble(itemData[1]));
            foodItem.setDescription(itemData[2]);
            foodItem.setImageUrl(itemData[3]);
            foodItem.setIsVeg(Boolean.parseBoolean(itemData[4]));
            foodItem.setCategory("Main Course");
            foodItem.setIsBestseller(Math.random() > 0.5);
            foodItemRepository.save(foodItem);
        }
    }
}
