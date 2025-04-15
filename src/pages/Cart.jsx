import { Link } from 'react-router-dom';
import { CartProvider, useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO title="Your Shopping Cart | Zora Fashion" />
      
      <h1 className="text-2xl md:text-3xl font-bold font-sora text-secondary mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">Your cart is currently empty</p>
          <Link to="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedSize}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-lg font-bold font-sora text-secondary mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">IDR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">IDR {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full">
                  <Button variant="primary" className="w-full">Proceed to Checkout</Button>
                </Link>
                <Link to="/products" className="block w-full">
                  <Button variant="secondary" className="w-full">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;