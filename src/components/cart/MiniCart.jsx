import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
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
          {/* Overlay - Removed blur effect and adjusted opacity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2.5px]" // Changed to solid overlay
            onClick={handleClose}
          />

          {/* Cart Panel - Updated background color */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: isVisible ? 0 : '100%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-beige/50 shadow-xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-deep-blue flex justify-between items-center">
              <h2 className="text-lg font-medium font-[sora] text-deep-blue">
                Your Cart ({cartCount})
              </h2>
              <button
                onClick={handleClose}
                className="text-deep-blue hover:text-warm-terracotta"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-deep-blue font-[montserrat] font-semibold mb-4">Your cart is empty</p>
                  <Link
                    to="/products"
                    onClick={handleClose}
                    className="inline-block bg-rich-teal/75 hover:bg-opacity-80 hover:bg-rich-teal text-deep-blue font-medium font-[montserrat] px-6 py-2 rounded-md"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-warm-terracotta">
                  {cart.map((item) => (
                    <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-deep-blue p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-deep-blue font-[montserrat]">
                    Subtotal
                  </span>
                  <span className="font-bold text-deep-blue font-[sora]">
                    IDR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="block w-full bg-rich-teal/75 hover:bg-opacity-80 hover:bg-rich-teal/50 text-deep-blue font-medium font-[montserrat] py-3 px-4 rounded-md text-center transition-all"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={handleClose}
                  className="block w-full mt-2 border border-deep-blue text-deep-blue hover:bg-warm-terracotta font-semibold py-3 px-4 rounded-md text-center transition-all"
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