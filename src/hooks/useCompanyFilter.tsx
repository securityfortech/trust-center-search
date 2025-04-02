import { useState, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';
import { CompanyData } from './useCompanyData';

export const useCompanyFilter = (companies: CompanyData[]) => {
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fuse, setFuse] = useState<Fuse<CompanyData> | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initialize Fuse for searching in company names
  useEffect(() => {
    if (companies.length > 0) {
      console.log('Initializing Fuse.js with', companies.length, 'companies');
      setFuse(new Fuse(companies, {
        keys: ['Company'],  // Focus search on company names
        threshold: 0.3,
        ignoreLocation: true,
      }));
      setFilteredCompanies(companies);
    }
  }, [companies]);

  // Apply filters when search term changes
  useEffect(() => {
    // Always show initial state if search is empty
    if (!searchTerm.trim()) {
      setIsInitialLoad(true);
      setFilteredCompanies(companies);
      return;
    }
    
    // Only search if we have at least 2 characters
    if (searchTerm.trim().length >= 2 && fuse) {
      setIsInitialLoad(false);
      const searchResults = fuse.search(searchTerm);
      const results = searchResults.map(result => result.item);
      console.log('Search results for:', searchTerm, 'found', results.length, 'companies');
      setFilteredCompanies(results);
    } else {
      // If less than 2 characters but not empty, keep initial state
      setIsInitialLoad(true);
      setFilteredCompanies(companies);
    }
  }, [searchTerm, companies, fuse]);

  // Memoize handleSearch to avoid unnecessary rerenders
  const handleSearch = useCallback((term: string) => {
    console.log('Search term changed to:', term);
    setSearchTerm(term);
  }, []);

  return {
    filteredCompanies,
    searchTerm,
    isInitialLoad,
    handleSearch,
  };
};
