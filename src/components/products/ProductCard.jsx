import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-4"
            >
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
                <EyeIcon className="h-5 w-5" />
              </button>
              <button
                className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                {isWishlisted ? (
                  <HeartIconSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
              </button>
            </motion.div>
          )}
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-secondary mb-1 truncate">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold">IDR {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                IDR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;