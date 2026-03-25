import React, { useState, useEffect } from 'react';
import { CartItem, CartResponse, OrderRequest } from '../types';
import { cartService } from '../services/restaurantService';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, CreditCard, Truck, User, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const [cartResponse, setCartResponse] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');

  useEffect(() => {
    calculateCartTotals();
  }, [cart]);

  const calculateCartTotals = async () => {
    if (cart.length > 0) {
      try {
        const response = await cartService.calculateCart(cart);
        setCartResponse(response);
      } catch (error) {
        console.error('Failed to calculate cart totals:', error);
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const orderRequest: OrderRequest = {
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        paymentMethod,
        items: cart
      };

      const order = await cartService.placeOrder(orderRequest);
      
      // Clear cart
      clearCart();
      
      // Show success message and redirect
      alert(`Order placed successfully! Order ID: ${order.id}`);
      navigate('/');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cartResponse || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-4">
            Add some items to your cart before checkout
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItemCount={getCartCount()} onCartClick={() => navigate('/')} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Customer Details */}
          <div className="space-y-6">
            {/* Account Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Address
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your delivery address"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when you receive your order</div>
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="ONLINE"
                    checked={paymentMethod === 'ONLINE'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Online Payment</div>
                    <div className="text-sm text-gray-500">Pay now using credit/debit card or UPI</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item: CartItem) => (
                  <div key={item.foodItemId} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{item.foodItemName}</h4>
                      <p className="text-gray-500 text-sm">₹{item.foodItemPrice} x {item.quantity}</p>
                    </div>
                    <span className="font-medium">₹{(item.foodItemPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Total ({cartResponse.totalItems} items)</span>
                  <span>₹{cartResponse.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Delivery Fee
                  </span>
                  <span>₹{cartResponse.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span>₹{cartResponse.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary-600">₹{cartResponse.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>

              <div className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms & Conditions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
