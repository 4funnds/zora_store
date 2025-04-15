import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

const ProductFilters = ({ categories, colors, priceRange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    color: searchParams.get('color') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'featured',
  });

  useEffect(() => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.color) params.color = filters.color;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.sort !== 'featured') params.sort = filters.sort;
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      color: '',
      minPrice: '',
      maxPrice: '',
      sort: 'featured',
    });
  };

  return (
    <div className="mb-8">
      {/* Mobile filter button */}
      <button
        type="button"
        className="md:hidden flex items-center text-sm font-medium text-secondary mb-4"
        onClick={() => setIsMobileFiltersOpen(true)}
      >
        <FunnelIcon className="h-5 w-5 mr-2" />
        Filters
      </button>

      <div className="relative">
        {/* Mobile filter dialog */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black bg-opacity-50 md:hidden">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-xs mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-6">
                <FilterSection
                  title="Category"
                  options={categories}
                  selected={filters.category}
                  onChange={(value) => handleFilterChange('category', value)}
                />
                <FilterSection
                  title="Color"
                  options={colors}
                  selected={filters.color}
                  onChange={(value) => handleFilterChange('color', value)}
                />
                <PriceFilter
                  priceRange={priceRange}
                  minPrice={filters.minPrice}
                  maxPrice={filters.maxPrice}
                  onChange={handleFilterChange}
                />
                <SortFilter
                  value={filters.sort}
                  onChange={(value) => handleFilterChange('sort', value)}
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-primary hover:text-opacity-80"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop filters */}
        <div className="hidden md:flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex space-x-6">
            <FilterSection
              title="Category"
              options={categories}
              selected={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
            <FilterSection
              title="Color"
              options={colors}
              selected={filters.color}
              onChange={(value) => handleFilterChange('color', value)}
            />
            <PriceFilter
              priceRange={priceRange}
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <SortFilter
            value={filters.sort}
            onChange={(value) => handleFilterChange('sort', value)}
          />
        </div>
      </div>

      {/* Active filters */}
      {(filters.category || filters.color || filters.minPrice || filters.maxPrice) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.category && (
            <ActiveFilter
              label={`Category: ${filters.category}`}
              onRemove={() => handleFilterChange('category', '')}
            />
          )}
          {filters.color && (
            <ActiveFilter
              label={`Color: ${filters.color}`}
              onRemove={() => handleFilterChange('color', '')}
            />
          )}
          {filters.minPrice && (
            <ActiveFilter
              label={`Min: IDR ${parseInt(filters.minPrice).toLocaleString()}`}
              onRemove={() => handleFilterChange('minPrice', '')}
            />
          )}
          {filters.maxPrice && (
            <ActiveFilter
              label={`Max: IDR ${parseInt(filters.maxPrice).toLocaleString()}`}
              onRemove={() => handleFilterChange('maxPrice', '')}
            />
          )}
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-primary hover:text-opacity-80"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

const FilterSection = ({ title, options, selected, onChange }) => {
  return (
    <div className="relative">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex items-center justify-between cursor-pointer text-sm">
          <span className="font-medium text-secondary">{title}</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-40">
          <div className="p-2 space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={title.toLowerCase()}
                  checked={selected === option}
                  onChange={() => onChange(option)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
};

const PriceFilter = ({ priceRange, minPrice, maxPrice, onChange }) => {
  const [localMin, setLocalMin] = useState(minPrice || '');
  const [localMax, setLocalMax] = useState(maxPrice || '');

  const handleApply = () => {
    onChange('minPrice', localMin);
    onChange('maxPrice', localMax);
  };

  return (
    <div className="relative">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex items-center justify-between cursor-pointer text-sm">
          <span className="font-medium text-secondary">Price</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-64 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <label htmlFor="minPrice" className="block text-sm text-gray-700 mb-1">
                  Min
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">IDR</span>
                  </div>
                  <input
                    type="number"
                    name="minPrice"
                    id="minPrice"
                    value={localMin}
                    onChange={(e) => setLocalMin(e.target.value)}
                    min="0"
                    max={priceRange.max}
                    className="block w-full pl-12 pr-12 py-2 border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder={priceRange.min}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm text-gray-700 mb-1">
                  Max
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">IDR</span>
                  </div>
                  <input
                    type="number"
                    name="maxPrice"
                    id="maxPrice"
                    value={localMax}
                    onChange={(e) => setLocalMax(e.target.value)}
                    min="0"
                    max={priceRange.max}
                    className="block w-full pl-12 pr-12 py-2 border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder={priceRange.max}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleApply}
              className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-opacity-90"
            >
              Apply
            </button>
          </div>
        </div>
      </details>
    </div>
  );
};

const SortFilter = ({ value, onChange }) => {
  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="text-sm font-medium text-secondary mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 text-sm font-medium text-secondary focus:ring-2 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const ActiveFilter = ({ label, onRemove }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 ml-1.5 inline-flex text-primary focus:outline-none"
      >
        <XMarkIcon className="h-3 w-3" />
      </button>
    </span>
  );
};

export default ProductFilters;