import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CartProvider, useCart } from '../hooks/useCart';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'bank_transfer',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOrderSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-secondary mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. We've sent a confirmation to your email.</p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Checkout | Zora Fashion</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <h1 className="text-2xl font-bold font-sora text-secondary mb-6">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-secondary mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-secondary mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-secondary mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium text-secondary mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Bank Transfer</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Credit Card</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md disabled:opacity-70"
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-bold font-sora text-secondary mb-4">Order Summary</h2>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="py-4 flex">
                  <div className="flex-shrink-0 w-20 h-20 bg-white border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium text-secondary">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-secondary">
                      IDR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-base font-medium text-secondary">
                <p>Subtotal</p>
                <p>IDR {cartTotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <p>Shipping</p>
                <p>Calculated at next step</p>
              </div>
              <div className="flex justify-between text-lg font-bold text-secondary mt-4">
                <p>Total</p>
                <p>IDR {cartTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;