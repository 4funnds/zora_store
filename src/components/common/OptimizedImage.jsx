import { useState } from 'react';

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Low-quality placeholder */}
      <img
        src={`${src}?w=20&q=10`} // Very small, low-quality version
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />
      {/* Actual image */}
      <img
        src={`${src}?w=800&q=80`} // Optimized version
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;