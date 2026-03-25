# Food Ordering System - Swiggy Clone

A full-stack food ordering application built with React + TailwindCSS (Frontend) and Java Spring Boot (Backend) with MySQL database.

## 🚀 Features

### Frontend (React + TypeScript + TailwindCSS)
- **Home Page**: Restaurant listing with search, filters, and sorting
- **Restaurant Menu Page**: Browse menu items with cart functionality
- **Checkout Page**: Complete order flow with payment options
- **Responsive Design**: Mobile-first design with modern UI
- **Real-time Cart**: Dynamic cart updates with quantity controls

### Backend (Java Spring Boot)
- **RESTful APIs**: Complete CRUD operations for restaurants, food items, and orders
- **Java Streams**: Efficient bill calculation using stream operations
- **MVC Architecture**: Proper separation of concerns
- **MySQL Database**: Persistent data storage
- **CORS Support**: Frontend-backend communication

## 📁 Project Structure

```
Virtusa_project/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/foodordering/
│   │   ├── controller/         # REST Controllers
│   │   ├── service/           # Business Logic
│   │   ├── repository/        # Data Access Layer
│   │   ├── model/             # JPA Entities
│   │   └── dto/               # Data Transfer Objects
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml                # Maven Dependencies
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # React Components
│   │   ├── pages/            # Page Components
│   │   ├── services/         # API Services
│   │   ├── types/            # TypeScript Types
│   │   └── hooks/            # Custom Hooks
│   ├── public/               # Static Assets
│   └── package.json          # NPM Dependencies
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **TailwindCSS** - Styling Framework
- **React Router** - Navigation
- **Axios** - HTTP Client
- **Lucide React** - Icons

### Backend
- **Java 17** - Programming Language
- **Spring Boot 3.2** - Application Framework
- **Spring Data JPA** - Database Access
- **MySQL** - Database
- **Maven** - Build Tool
- **Lombok** - Code Generation

## 📊 Database Schema

### Restaurants
- `id` (Primary Key)
- `name`, `imageUrl`, `rating`
- `deliveryTime`, `location`, `cuisine`
- `isVeg`, `offerBadge`

### Food Items
- `id` (Primary Key)
- `name`, `description`, `price`
- `imageUrl`, `category`, `restaurantId`
- `isVeg`, `isBestseller`

### Orders
- `id` (Primary Key)
- `customerName`, `customerEmail`, `customerPhone`
- `deliveryAddress`, `paymentMethod`
- `subtotal`, `deliveryFee`, `taxAmount`, `totalPrice`
- `orderStatus`, `createdAt`

### Order Items
- `id` (Primary Key)
- `orderId`, `foodItemId`
- `foodItemName`, `foodItemPrice`
- `quantity`, `subtotal`

## 📡 API Endpoints

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/{id}` - Get restaurant by ID
- `GET /api/restaurants/search?query=` - Search restaurants
- `GET /api/restaurants/filter/veg?isVeg=` - Filter by veg/non-veg
- `GET /api/restaurants/filter/rating?minRating=` - Filter by rating

### Food Items
- `GET /api/food-items/restaurant/{restaurantId}` - Get restaurant menu
- `GET /api/food-items/restaurant/{restaurantId}/search?query=` - Search menu items
- `GET /api/food-items/restaurant/{restaurantId}/filter/veg?isVeg=` - Filter by veg/non-veg
- `GET /api/food-items/restaurant/{restaurantId}/bestsellers` - Get bestsellers

### Cart & Orders
- `POST /api/cart/calculate` - Calculate cart totals
- `POST /api/orders` - Place order
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/customer/{email}` - Get customer orders

## 🎯 User Flow

1. **Browse Restaurants** → View restaurant cards with ratings and delivery info
2. **Select Restaurant** → Navigate to restaurant menu page
3. **Browse Menu** → Search and filter food items
4. **Add to Cart** → Use quantity controls to add items
5. **View Cart** → See cart summary with real-time calculations
6. **Checkout** → Enter delivery details and payment method
7. **Place Order** → Submit order with backend validation
8. **Order Confirmation** → View order details and confirmation

## 🚀 Setup & Installation

### Prerequisites
- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher

### Database Setup

1. **Create MySQL Database**
```sql
CREATE DATABASE food_ordering;
```

2. **Update Database Configuration**
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/food_ordering?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

### Backend Setup

1. **Navigate to Backend Directory**
```bash
cd backend
```

2. **Install Dependencies**
```bash
mvn clean install
```

3. **Run Backend Server**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to Frontend Directory**
```bash
cd frontend
```

2. **Install Dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Start Development Server**
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🎨 Design Features

### Modern UI Components
- **Restaurant Cards**: Hover effects, ratings, delivery time
- **Menu Items**: Veg indicators, bestseller badges, quantity controls
- **Cart Sidebar**: Real-time updates, price calculations
- **Checkout Form**: Validation, payment options, order summary

### Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Grid Layouts**: Flexible restaurant and menu grids
- **Touch Friendly**: Large tap targets and gestures
- **Loading States**: Skeleton screens and loading indicators

### User Experience
- **Search & Filter**: Real-time search with multiple filters
- **Sorting Options**: By rating and delivery time
- **Cart Management**: Add/remove items with quantity controls
- **Order Tracking**: Complete order history and status

## 🔧 Java Streams Implementation

The system uses Java Streams for efficient bill calculation:

```java
// Cart total calculation using streams
Double subtotal = orderRequest.getItems().stream()
    .mapToDouble(item -> item.getFoodItemPrice() * item.getQuantity())
    .sum();

// Tax and total calculation
Double deliveryFee = 2.99;
Double tax = subtotal * 0.08;
Double totalPrice = subtotal + deliveryFee + tax;
```

## 🌱 Sample Data

The application automatically loads sample data on startup:
- **4 Restaurants**: Burger Palace, Pizza Heaven, Green Garden, Sushi Express
- **8 Food Items**: 2 items per restaurant with varied categories
- **Mixed Options**: Veg and non-veg items with bestseller badges

## 📱 Key Features

### Search & Filter
- Real-time restaurant search
- Veg/Non-veg filtering
- Rating-based filtering
- Menu item search
- Category-based filtering

### Cart Management
- Add/remove items
- Quantity controls
- Real-time price updates
- Cart persistence
- Clear cart functionality

### Order Processing
- Customer information collection
- Delivery address management
- Payment method selection
- Order confirmation
- Order history tracking

## 🚀 Performance Features

- **Lazy Loading**: Efficient data loading
- **Caching**: Restaurant and menu caching
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Graceful error recovery
- **Loading States**: User feedback during operations

## 🎯 Business Logic

### Pricing Model
- Base item prices from menu
- Fixed delivery fee ($2.99)
- 8% tax on subtotal
- Dynamic total calculation

### Order Flow
- Cart validation
- Customer verification
- Payment processing simulation
- Order status tracking
- Email notifications (simulated)

This is a production-ready food ordering system with all the features of modern food delivery apps like Swiggy, Zomato, or Uber Eats.
