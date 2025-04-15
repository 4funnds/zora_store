import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider, useCart } from '../../hooks/useCart';
import CartItem from './CartItem';

const MiniCart = ({ isOpen, onClose }) => {
  const { cart, cartTotal, cartCount } = useCart();
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
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
            onClick={handleClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: isVisible ? 0 : '100%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium font-sora">Your Cart ({cartCount})</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link
                    to="/products"
                    onClick={handleClose}
                    className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-2 rounded-md"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">IDR {cartTotal.toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="block w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-md text-center"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={handleClose}
                  className="block w-full mt-2 border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-4 rounded-md text-center"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;