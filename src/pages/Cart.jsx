import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="container mx-auto mt-12 px-4 py-8">
      <SEO title="Your Shopping Cart | Zora Fashion" />
      
      <h1 className="text-2xl md:text-3xl font-bold font-[sora] text-deep-blue mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-deep-blue font-semibold font-[sora] mb-6">Your cart is currently empty</p>
          <Link to="/products">
            <Button variant="primary" className='font-semibold font-[montserrat]'>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-beige rounded-lg shadow-sm divide-y font-bold">
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
            <div className="bg-beige p-6 rounded-lg sticky top-4">
              <h2 className="text-lg font-bold font-[sora] text-deep-blue mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-deep-blue font-semibold font-[montserrat]">Subtotal</span>
                  <span className="font-semibold text-deep-blue font-[montserrat]">IDR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep-blue font-semibold font-[montserrat]">Shipping</span>
                  <span className="font-semibold text-deep-blue font-[montserrat]">Calculated at checkout</span>
                </div>
                <div className="border-t border-deep-blue pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-deep-blue font-[sora]">Total</span>
                    <span className="font-bold text-deep-blue font-[sora]">IDR {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full">
                  <Button variant="primary" className="w-full font-[montserrat] font-semibold">Proceed to Checkout</Button>
                </Link>
                <Link to="/products" className="block w-full">
                  <Button variant="secondary" className="w-full font-[montserrat] font-semibold">Continue Shopping</Button>
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