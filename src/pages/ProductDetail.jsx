import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
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
    <div className="container mx-auto mt-8 px-4 py-8 md:py-12">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-deep-blue hover:text-warm-terracotta font-[montserrat] mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-beige rounded-lg overflow-hidden mb-4">
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
                className={`border rounded-md overflow-hidden ${selectedImage === index ? 'border-medium-beige' : 'border-rich-teal/50'}`}
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
          <h1 className="text-2xl md:text-3xl font-bold font-[sora] text-deep-blue mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-deep-blue/25'}`}
                />
              ))}
            </div>
            <span className="text-sm text-deep-blue font-[montserrat] font-semibold">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-2xl text-deep-blue font-[montserrat] font-light">
              IDR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-gray-500 font-[montserrat] font-extralight line-through">
                IDR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-deep-blue mb-6">{product.description}</p>

          {/* Colors */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="text-sm font-medium font-[montserrat] text-deep-blue mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-medium-beige focus:outline-none focus:ring-2 focus:ring-medium-beige/75"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium font-[montserrat] text-deep-blue mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-[montserrat] font-medium ${
                    selectedSize === size
                      ? 'bg-medium-beige/50 text-deep-blue border-warm-terracotta/25'
                      : 'border-warm-terracotta/25 text-deep-blue hover:bg-warm-terracotta/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium font-[montserrat] text-deep-blue mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-2 border-medium-beige rounded-l-md text-deep-blue hover:bg-warm-terracotta/25"
              >
                -
              </button>
              <span className="px-4 py-1 border-t-2 border-b-2 border-medium-beige font-[montserrat] text-deep-blue text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-2 border-medium-beige rounded-r-md text-deep-blue hover:bg-warm-terracotta/25"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-rich-teal hover:bg-opacity-80 hover:bg-rich-teal/75 hover:scale-103 text-beige font-medium py-3 px-6 rounded-md flex items-center justify-center transition-all"
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex-1 border border-rich-teal text-deep-blue hover:bg-warm-terracotta/25 hover:text-warm-terracotta font-semibold py-3 px-6 rounded-md flex items-center justify-center transition-all"
            >
              <HeartIcon className="h-5 w-5 mr-2" />
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16 border-t border-deep-blue pt-8">
        <h2 className="text-xl font-bold font-[sora] text-deep-blue mb-6">Product Details</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="text-deep-blue mr-2">•</span>
              <span className="text-deep-blue font-[montserrat]">{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="mt-16 border-t border-deep-blue pt-8">
        <h2 className="text-xl font-bold font-[sora] text-deep-blue mb-6">Customer Reviews</h2>
        {/* Review component would go here */}
        <button className="mt-4 text-deep-blue font-[montserrat] font-medium hover:underline transition-all">
          Write a Review
        </button>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold font-[sora] text-deep-blue mb-6">You May Also Like</h2>
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