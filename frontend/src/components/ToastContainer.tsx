import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast, isDarkMode } = useUIStore();

  const getIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getToastStyles = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return isDarkMode ? 'bg-green-900/90 border-green-700' : 'bg-green-50 border-green-200';
      case 'error':
        return isDarkMode ? 'bg-red-900/90 border-red-700' : 'bg-red-50 border-red-200';
      case 'info':
        return isDarkMode ? 'bg-blue-900/90 border-blue-700' : 'bg-blue-50 border-blue-200';
      default:
        return isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm min-w-[300px] max-w-md ${getToastStyles(
              toast.type
            )}`}
          >
            {getIcon(toast.type)}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className={`p-1 rounded-full transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
