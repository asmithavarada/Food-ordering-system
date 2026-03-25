import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-2">
      <motion.svg
        width={size === 'small' ? 32 : size === 'medium' ? 40 : 48}
        height={size === 'small' ? 32 : size === 'medium' ? 40 : 48}
        viewBox="0 0 100 100"
        className={sizeClasses[size]}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="foodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#F7931E" />
          </linearGradient>
        </defs>
        
        {/* Plate */}
        <motion.ellipse
          cx="50"
          cy="60"
          rx="35"
          ry="8"
          fill="url(#foodGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        
        {/* Fork */}
        <motion.path
          d="M30 20 L30 50 L32 50 L32 20 M28 20 L28 30 M34 20 L34 30"
          stroke="url(#foodGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        
        {/* Knife */}
        <motion.path
          d="M65 20 L65 50 L68 50 L68 25 L70 20 Z"
          stroke="url(#foodGradient)"
          strokeWidth="2"
          fill="url(#foodGradient)"
          fillOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        
        {/* Flame/Chef Hat */}
        <motion.path
          d="M45 10 Q50 5 55 10 Q52 15 50 20 Q48 15 45 10 Z"
          fill="url(#foodGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </motion.svg>
      
      <motion.span
        className={`${textSizes[size]} font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Food Ordering System
      </motion.span>
    </div>
  );
};

export default Logo;
