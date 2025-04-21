import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState, useCallback } from 'react';
import { products } from '../../data/products';

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const inputRef = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Generate search suggestions
  const generateSuggestions = useCallback((input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    
    const inputLower = input.toLowerCase();
    const suggestionSet = new Set();

    // Search in product names
    products.forEach(product => {
      if (product.name.toLowerCase().includes(inputLower)) {
        suggestionSet.add(product.name);
      }
    });

    // Search in categories
    [...new Set(products.map(p => p.category))].forEach(category => {
      if (category.toLowerCase().includes(inputLower)) {
        suggestionSet.add(category);
      }
    });

    // Search in colors
    [...new Set(products.flatMap(p => p.colors))].forEach(color => {
      if (color.toLowerCase().includes(inputLower)) {
        suggestionSet.add(color);
      }
    });

    setSuggestions([...suggestionSet].slice(0, 5));
  }, []);

  // Debounced suggestion generation
  const debouncedSuggestions = useCallback(
    debounce(generateSuggestions, 300),
    [generateSuggestions]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSuggestions(value);
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [searchInput.trim(), ...prev.filter(h => h !== searchInput.trim())].slice(0, 5);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
      onClose();
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    setSearchInput(suggestion);
    onSearch(suggestion);
    // Update search history
    setSearchHistory(prev => {
      const newHistory = [suggestion, ...prev.filter(h => h !== suggestion)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    onClose();
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search products..."
                className="w-full py-4 pl-12 pr-12 rounded-lg shadow-xl bg-beige text-deep-blue placeholder-medium-beige focus:outline-none focus:ring-2 focus:ring-warm-terracotta"
              />
              <button
                type="submit"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-deep-blue hover:text-warm-terracotta"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-deep-blue hover:text-warm-terracotta"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </form>

            {/* Suggestions Dropdown */}
            {(suggestions.length > 0 || searchHistory.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-beige rounded-lg shadow-xl overflow-hidden"
              >
                {suggestions.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-sm font-medium text-deep-blue border-b border-medium-beige">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={`suggestion-${index}`}
                        type="button"
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-warm-terracotta/10 text-deep-blue"
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
                        key={`history-${index}`}
                        type="button"
                        onClick={() => handleSelectSuggestion(term)}
                        className="w-full text-left px-4 py-3 hover:bg-warm-terracotta/10 text-deep-blue flex items-center"
                      >
                        <ClockIcon className="h-4 w-4 mr-2 text-medium-beige" />
                        {term}
                      </button>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;