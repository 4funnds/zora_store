import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { products } from '../data/products';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterOptions = {
    categories: [...new Set(products.map(p => p.category))],
    colors: [...new Set(products.flatMap(p => p.colors))],
    priceRange: { 
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    }
  };

  useEffect(() => {
    let result = [...products];
    const category = searchParams.get('category');
    const color = searchParams.get('color');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (color) {
      result = result.filter(p => p.colors.includes(color));
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (sort) {
      switch (sort) {
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        default: // 'featured'
          result.sort((a, b) => b.isFeatured - a.isFeatured);
      }
    }

    setFilteredProducts(result);
  }, [searchParams]);

  return (
    <>
      <SEO 
        title="Shop | Zora Fashion"
        description="Browse our collection of Indonesian-inspired fashion"
      />

      <div className="container mx-auto mt-12 px-4 py-8">
        <ProductFilters 
          categories={filterOptions.categories}
          colors={filterOptions.colors}
          priceRange={filterOptions.priceRange}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold font-[montserrat] text-deep-blue mb-2">
              No products found
            </h3>
            <p className="text-deep-blue">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </>
  );
};

export default ProductList;