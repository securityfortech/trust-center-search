
import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { CompanyData } from './useCompanyData';

export const useCompanyFilter = (
  companies: CompanyData[],
  certifications: string[]
) => {
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyData[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fuse, setFuse] = useState<Fuse<CompanyData> | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initialize Fuse for searching primarily in company names
  useEffect(() => {
    if (companies.length > 0 && certifications.length > 0) {
      setFuse(new Fuse(companies, {
        keys: ['Company'],  // Focus search on company names
        threshold: 0.3,
        ignoreLocation: true,
      }));
      setFilteredCompanies(companies);
    }
  }, [companies, certifications]);

  // Apply filters when search term or selected certifications change
  useEffect(() => {
    let results = [...companies];
    
    if (searchTerm && fuse) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults.map(result => result.item);
    }
    
    if (selectedCertifications.length > 0) {
      results = results.filter(company => 
        selectedCertifications.every(cert => 
          company[cert] === 'Yes' || 
          company[cert] === 'yes' || 
          company[cert] === 'TRUE' || 
          company[cert] === 'true'
        )
      );
    }
    
    setFilteredCompanies(results);
    
    if (isInitialLoad && (searchTerm || selectedCertifications.length > 0)) {
      setIsInitialLoad(false);
    }
  }, [searchTerm, selectedCertifications, companies, fuse, isInitialLoad]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleToggleCertification = (certification: string) => {
    setSelectedCertifications(prev => 
      prev.includes(certification)
        ? prev.filter(c => c !== certification)
        : [...prev, certification]
    );
  };

  return {
    filteredCompanies,
    selectedCertifications,
    searchTerm,
    isInitialLoad,
    handleSearch,
    handleToggleCertification
  };
};
