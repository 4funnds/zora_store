// src/hooks/useSearch.js
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products } from "../data/products";

export const useSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Extract search term from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery);

    if (searchQuery) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.details.some((detail) =>
            detail.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setSearchResults(results);
    } else {
      setSearchResults(products);
    }
  }, [location.search]);

  const handleSearch = (term) => {
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  return { searchTerm, searchResults, handleSearch };
};
