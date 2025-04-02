
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Fuse from 'fuse.js';
import { toast } from '@/components/ui/sonner';

export interface CompanyData {
  Company: string;
  'Trust Center URL': string;
  [key: string]: string;
}

interface DataProviderProps {
  children: (props: {
    companies: CompanyData[];
    filteredCompanies: CompanyData[];
    certifications: string[];
    selectedCertifications: string[];
    searchTerm: string;
    isLoading: boolean;
    isInitialLoad: boolean;
    handleSearch: (term: string) => void;
    handleToggleCertification: (certification: string) => void;
  }) => React.ReactNode;
  csvUrl: string;
}

const DataProvider: React.FC<DataProviderProps> = ({ children, csvUrl }) => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyData[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fuse, setFuse] = useState<Fuse<CompanyData> | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as CompanyData[];
            setCompanies(data);
            setFilteredCompanies(data);
            
            if (data.length > 0) {
              const certNames = Object.keys(data[0])
                .filter(key => 
                  key !== 'Company' && 
                  key !== 'Trust Center URL' && 
                  !key.startsWith('_')
                );
              setCertifications(certNames);
            }
            
            setFuse(new Fuse(data, {
              keys: ['Company', ...certifications],
              threshold: 0.3,
              ignoreLocation: true,
            }));
            
            setIsLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            toast.error('Error parsing data. Please try again later.');
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Could not fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  useEffect(() => {
    if (companies.length > 0 && certifications.length > 0) {
      setFuse(new Fuse(companies, {
        keys: ['Company', ...certifications],
        threshold: 0.3,
        ignoreLocation: true,
      }));
    }
  }, [companies, certifications]);

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

  return children({
    companies,
    filteredCompanies,
    certifications,
    selectedCertifications,
    searchTerm,
    isLoading,
    isInitialLoad,
    handleSearch,
    handleToggleCertification,
  });
};

export default DataProvider;
