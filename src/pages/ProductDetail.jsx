import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/products/ProductCard';
import { getProductById, products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  if (!product) return <div className="container mx-auto py-12">Product not found</div>;

  // useEffect(() => {
  //   const foundProduct = products.find(p => p.id === id) || products[0];
  //   setProduct(foundProduct);
  // }, [id]);

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
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-secondary hover:text-primary mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-md overflow-hidden ${selectedImage === index ? 'border-primary' : 'border-gray-200'}`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${index}`}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-sora text-secondary mb-2">
            {product.name}
          </h1>
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

          {/* Colors */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

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
            <h3 className="text-sm font-medium text-secondary mb-2">Quantity</h3>
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

      {/* Product Details */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-sora text-secondary mb-6">Product Details</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-gray-700">{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold font-sora text-secondary mb-6">Customer Reviews</h2>
        {/* Review component would go here */}
        <button className="mt-4 text-primary font-medium hover:underline">
          Write a Review
        </button>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold font-sora text-secondary mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;