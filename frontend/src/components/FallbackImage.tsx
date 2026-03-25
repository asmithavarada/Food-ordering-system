import React, { useState } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop&auto=format' 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
      setRetryCount(prev => prev + 1);
      
      // Try fallback images in sequence
      if (retryCount === 0 && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else if (retryCount === 1) {
        // Try a different reliable food image
        setImgSrc('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop&auto=format');
      } else if (retryCount === 2) {
        // Final fallback - pizza image which is very reliable
        setImgSrc('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop&auto=format');
      } else {
        // Keep the last attempted image
        setIsLoading(false);
      }
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className="image-wrapper">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-2xl`} />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError && !isLoading ? 'opacity-75' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
};

export default FallbackImage;
