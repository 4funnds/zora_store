import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { CartProvider, useCart } from '../../hooks/useCart';

const QuickView = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                >
                  <XMarkIcon className="h-5 w-5 text-secondary" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Images */}
                  <div className="bg-gray-50 p-4">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold font-sora text-secondary mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-5 w-5 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className="text-2xl font-bold text-primary">
                        IDR {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-400 line-through">
                          IDR {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    {/* Sizes */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-secondary mb-2">Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 border rounded-md text-sm font-medium ${
                              selectedSize === size
                                ? 'bg-primary text-white border-primary'
                                : 'border-gray-300 text-secondary hover:border-primary'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-secondary mb-2">
                        Quantity
                      </h3>
                      <div className="flex items-center">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors"
                      >
                        <ShoppingBagIcon className="h-5 w-5 mr-2" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors"
                      >
                        <HeartIcon className="h-5 w-5 mr-2" />
                        {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickView;