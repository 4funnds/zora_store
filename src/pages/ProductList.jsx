import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import { products } from '../data/products';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Initialize filter options
  const filterOptions = useMemo(() => ({
    categories: [...new Set(products.map(p => p.category))],
    colors: [...new Set(products.flatMap(p => p.colors))],
    priceRange: { 
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    }
  }), []);

  // Get search term from URL
  const searchTerm = searchParams.get('search') || '';

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Generate search suggestions
  const getSuggestions = useCallback((input) => {
    if (!input) return [];
    
    const inputLower = input.toLowerCase();
    const suggestions = new Set();

    // Search in product names
    products.forEach(product => {
      if (product.name.toLowerCase().includes(inputLower)) {
        suggestions.add(product.name);
      }
    });

    // Search in categories
    filterOptions.categories.forEach(category => {
      if (category.toLowerCase().includes(inputLower)) {
        suggestions.add(category);
      }
    });

    // Search in colors
    filterOptions.colors.forEach(color => {
      if (color.toLowerCase().includes(inputLower)) {
        suggestions.add(color);
      }
    });

    return [...suggestions].slice(0, 5);
  }, [filterOptions]);

  const suggestions = useMemo(() => getSuggestions(searchInput), [searchInput, getSuggestions]);

  // Filter products based on all criteria
  const filterProducts = useCallback(() => {
    let result = [...products];
    const category = searchParams.get('category');
    const color = searchParams.get('color');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    const search = searchParams.get('search');

    // Apply search filter first
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.colors.some(c => c.toLowerCase().includes(searchLower)) ||
        p.details.some(d => d.toLowerCase().includes(searchLower))
      );
    }

    // Apply other filters
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

    // Apply sorting
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

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('search', term);
        // Add to search history
        setSearchHistory(prev => {
          const newHistory = [term, ...prev.filter(h => h !== term)].slice(0, 5);
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
          return newHistory;
        });
      } else {
        params.delete('search');
      }
      setSearchParams(params);
    }, 300),
    [searchParams, setSearchParams]
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    setSearchInput(suggestion);
    const params = new URLSearchParams(searchParams);
    params.set('search', suggestion);
    setSearchParams(params);
    setShowSuggestions(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
    setShowSuggestions(false);
  };

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Filter products whenever search params change
  useEffect(() => {
    filterProducts();
  }, [searchParams, filterProducts]);

  return (
    <>
      <SEO 
        title={searchTerm ? `Search: ${searchTerm}` : 'Shop'}
        description="Browse our collection of Indonesian-inspired fashion"
      />

      <div className="container mx-auto mt-12 px-4 py-8">
        {/* Enhanced Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-3 border border-medium-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-terracotta text-deep-blue"
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-beige" />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medium-beige hover:text-warm-terracotta"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {(showSuggestions && (suggestions.length > 0 || searchHistory.length > 0)) && (
            <div className="absolute z-10 w-full mt-1 bg-beige border border-medium-beige rounded-lg shadow-lg">
              {suggestions.length > 0 && (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-deep-blue border-b border-medium-beige">
                    Suggestions
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-warm-terracotta/10 text-deep-blue"
                    >
                      {suggestion}
                    </button>
                  ))}
                </>
              )}

              {searchHistory.length > 0 && (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-deep-blue border-b border-medium-beige">
                    Recent Searches
                  </div>
                  {searchHistory.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSuggestion(term)}
                      className="w-full text-left px-4 py-2 hover:bg-warm-terracotta/10 text-deep-blue flex items-center"
                    >
                      <ClockIcon className="h-4 w-4 mr-2 text-medium-beige" />
                      {term}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <ProductFilters 
          categories={filterOptions.categories}
          colors={filterOptions.colors}
          priceRange={filterOptions.priceRange}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold font-[montserrat] text-deep-blue mb-2">
              {searchTerm ? `No results for "${searchTerm}"` : 'No products found'}
            </h3>
            <p className="text-deep-blue">
              {searchTerm ? 'Try different keywords' : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className="font-[montserrat] text-deep-blue mb-4">
                Showing {filteredProducts.length} results for "{searchTerm}"
              </p>
            )}
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;