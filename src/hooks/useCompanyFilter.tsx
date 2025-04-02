
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
    let results = [...companies];
    
    if (searchTerm && fuse) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults.map(result => result.item);
    }
    
    setFilteredCompanies(results);
    
    if (isInitialLoad && searchTerm) {
      setIsInitialLoad(false);
    }
  }, [searchTerm, companies, fuse, isInitialLoad]);

  // Memoize handleSearch to avoid unnecessary rerenders
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (term.trim() !== '') {
      setIsInitialLoad(false);
    }
  }, []);

  return {
    filteredCompanies,
    searchTerm,
    isInitialLoad,
    handleSearch,
  };
};
