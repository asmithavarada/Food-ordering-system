import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ToastContainer from './components/ToastContainer';
import AddFoodForm from './components/AddFoodForm';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import { useUIStore } from './store/useUIStore';
import { sampleFoods } from './data/sampleData';
import { Food } from './types';
import './index.css';

const AppContent: React.FC = () => {
  const { isDarkMode } = useUIStore();

  const handleAddFood = (food: Food) => {
    sampleFoods.push(food);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />
        <Cart />
        <ToastContainer />
        <AddFoodForm onAddFood={handleAddFood} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
