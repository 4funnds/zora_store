import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import OptimizedImage from '../common/OptimizedImage';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

const ProductGrid = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadIndex, setLoadIndex] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Load products in batches for performance
  useEffect(() => {
    setVisibleProducts(products.slice(0, 12));
    setLoadIndex(12);
  }, [products]);

  useEffect(() => {
    if (isVisible && loadIndex < products.length) {
      // Load next batch of products
      const nextIndex = Math.min(loadIndex + 8, products.length);
      setVisibleProducts(prev => [...prev, ...products.slice(loadIndex, nextIndex)]);
      setLoadIndex(nextIndex);
    }
  }, [isVisible, loadIndex, products]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {visibleProducts.map((product) => (
        <ProductCard key={`${product.id}-${product.variant}`} product={product} />
      ))}
      
      {/* Intersection observer trigger */}
      {loadIndex < products.length && (
        <div ref={ref} className="col-span-full h-1"></div>
      )}
    </div>
  );
};

export default ProductGrid;