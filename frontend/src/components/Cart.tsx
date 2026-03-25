import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Clock, Tag } from 'lucide-react';
import { useCartStore, useCartTotals, useCartItems, usePromoCode, useDeliveryTime } from '../store/useCartStore';
import { useUIStore } from '../store/useUIStore';
import FallbackImage from './FallbackImage';

const Cart: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  
  const {
    removeItem,
    updateQuantity,
    clearCart,
    setDeliveryTime,
    setPaymentMethod,
    applyPromoCode,
    placeOrder,
  } = useCartStore();

  // Reactive selectors - automatically update when state changes
  const cartItems = useCartItems();
  const totals = useCartTotals();
  const promoCode = usePromoCode();
  const deliveryTime = useDeliveryTime();
  // paymentMethod is used later in the component

  const { isCartOpen, toggleCart, isDarkMode, addToast } = useUIStore();

  const handlePromoApply = () => {
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput);
      if (success) {
        addToast({
          type: 'success',
          message: `Promo code applied! You saved ₹${totals.discount.toFixed(2)}`,
          duration: 3000,
        });
        setPromoInput('');
      } else {
        addToast({
          type: 'error',
          message: 'Invalid promo code',
          duration: 3000,
        });
      }
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      addToast({
        type: 'error',
        message: 'Please select a payment method',
        duration: 3000,
      });
      return;
    }

    setPaymentMethod(selectedPayment);
    const orderId = placeOrder();
    
    if (orderId) {
      addToast({
        type: 'success',
        message: `Order placed successfully! Order ID: ${orderId}`,
        duration: 4000,
      });
      setShowCheckout(false);
      setSelectedPayment('');
      toggleCart();
      
      // Redirect to orders after a delay
      setTimeout(() => {
        window.location.href = '/orders';
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md z-50 overflow-y-auto ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <div className="sticky top-0 z-10 backdrop-blur-lg border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-orange-500" size={24} />
                  <h2 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {showCheckout ? 'Checkout' : 'Your Cart'}
                  </h2>
                </div>
                <button
                  onClick={toggleCart}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? 'hover:bg-gray-800 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <ShoppingBag
                    size={64}
                    className={`mx-auto mb-4 ${
                      isDarkMode ? 'text-gray-700' : 'text-gray-300'
                    }`}
                  />
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your cart is empty
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Add some delicious food to get started!
                  </p>
                </motion.div>
              ) : (
                <>
                  {!showCheckout ? (
                    <>
                      {/* Cart Items */}
                      <div className="space-y-4 mb-6">
                        <AnimatePresence>
                          {cartItems.map((item: any) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              className={`rounded-lg p-3 ${
                                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                              }`}
                            >
                              <div className="flex gap-3">
                                <FallbackImage
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className={`font-semibold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {item.name}
                                  </h4>
                                  <p className={`text-sm ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                    {item.restaurantName}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-orange-500">
                                      ₹{item.price}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className={`p-1 rounded transition-colors ${
                                          isDarkMode
                                            ? 'hover:bg-gray-700 text-gray-400'
                                            : 'hover:bg-gray-200 text-gray-600'
                                        }`}
                                      >
                                        <Minus size={16} />
                                      </button>
                                      <span className={`font-medium w-8 text-center ${
                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                      }`}>
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className={`p-1 rounded transition-colors ${
                                          isDarkMode
                                            ? 'hover:bg-gray-700 text-gray-400'
                                            : 'hover:bg-gray-200 text-gray-600'
                                        }`}
                                      >
                                        <Plus size={16} />
                                      </button>
                                      <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Bill Summary */}
                      <div className={`rounded-lg p-4 mb-6 border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <h3 className={`font-semibold mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Bill Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Subtotals.total
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ₹{totals.subtotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Tax (5%)
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ₹{totals.tax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Delivery Fee
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ₹{totals.deliveryFee.toFixed(2)}
                            </span>
                          </div>
                          {totals.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount ({promoCode})</span>
                              <span>-₹{totals.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                Total
                              </span>
                              <span className="text-orange-500">
                                ₹{totals.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowCheckout(true)}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg"
                        >
                          Proceed to Payment • ₹{totals.total.toFixed(2)}
                        </motion.button>
                        <button
                          onClick={clearCart}
                          className={`w-full py-2 px-4 rounded-full font-medium transition-colors ${
                            isDarkMode
                              ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Clear Cart
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Checkout Form */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {/* Promo Code */}
                      <div>
                        <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          <Tag size={18} />
                          Promo Code
                        </h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="Enter promo code"
                            className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                              isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-gray-100 border-gray-300 text-gray-900'
                            }`}
                          />
                          <button
                            onClick={handlePromoApply}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <p className={`text-xs mt-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Try: FLAT10, SAVE20, FIRST50
                        </p>
                      </div>

                      {/* Delivery Time */}
                      <div>
                        <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          <Clock size={18} />
                          Delivery Time
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                          {['20 mins', '30 mins', '45 mins'].map((time) => (
                            <button
                              key={time}
                              onClick={() => setDeliveryTime(time)}
                              className={`py-2 px-3 rounded-lg border transition-colors ${
                                deliveryTime === time
                                  ? 'bg-orange-500 text-white border-orange-500'
                                  : isDarkMode
                                  ? 'bg-gray-800 border-gray-700 text-gray-300'
                                  : 'bg-gray-100 border-gray-300 text-gray-700'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          <CreditCard size={18} />
                          Payment Method
                        </h3>
                        <div className="space-y-2">
                          {[
                            { id: 'credit-card', label: 'Credit Card' },
                            { id: 'debit-card', label: 'Debit Card' },
                            { id: 'upi', label: 'UPI' },
                          ].map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedPayment(method.id)}
                              className={`w-full p-3 rounded-lg border transition-colors text-left ${
                                selectedPayment === method.id
                                  ? 'bg-orange-50 border-orange-500 text-orange-700'
                                  : isDarkMode
                                  ? 'bg-gray-800 border-gray-700 text-gray-300'
                                  : 'bg-gray-50 border-gray-200 text-gray-700'
                              }`}
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className={`rounded-lg p-4 border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <h3 className={`font-semibold mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Order Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Subtotals.total
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ₹{totals.subtotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Tax
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ₹{totals.tax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Delivery
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              ₹{totals.deliveryFee.toFixed(2)}
                            </span>
                          </div>
                          {totals.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span>-₹{totals.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-bold">
                              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                Total
                              </span>
                              <span className="text-orange-500">
                                ₹{totals.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePlaceOrder}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg"
                        >
                          Place Order • ₹{totals.total.toFixed(2)}
                        </motion.button>
                        <button
                          onClick={() => setShowCheckout(false)}
                          className={`w-full py-2 px-4 rounded-full font-medium transition-colors ${
                            isDarkMode
                              ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Back to Cart
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
