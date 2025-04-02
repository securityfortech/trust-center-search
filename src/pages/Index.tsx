import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Fuse from 'fuse.js';
import { toast } from '@/components/ui/sonner';
import SearchBar from '@/components/SearchBar';
import CertificationFilters from '@/components/CertificationFilters';
import CompanyCard from '@/components/CompanyCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Shield } from 'lucide-react';

const CSV_URL = 'https://raw.githubusercontent.com/securityfortech/trust-center-db/refs/heads/main/Trust_Center_Certification_CSV.csv?token=GHSAT0AAAAAAC666XH55I25T2CXJ2TPRMLUZ7MUJFQ';

interface CompanyData {
  Company: string;
  'Trust Center URL': string;
  [key: string]: string;
}

const Index = () => {
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
        const response = await fetch(CSV_URL);
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
  }, []);

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
  }, [searchTerm, selectedCertifications, companies, fuse]);

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

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold text-trust-dark dark:text-white">
                TrustCenterDB
              </h1>
            </div>
            <p className="text-center text-muted-foreground max-w-2xl">
              Search and filter security & compliance certifications across major companies
            </p>
            <div className="w-full max-w-3xl mt-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            {certifications.length > 0 && (
              <CertificationFilters
                certifications={certifications}
                selectedCertifications={selectedCertifications}
                onToggleCertification={handleToggleCertification}
              />
            )}
            
            <div className="mt-6">
              {isInitialLoad ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">Start searching or select certifications to discover companies</p>
                  <p className="text-muted-foreground mt-2">
                    Use the search bar or certification filters to find trust centers
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Showing {filteredCompanies.length} of {companies.length} companies
                  </p>
                  
                  {filteredCompanies.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg font-medium">No matches found</p>
                      <p className="text-muted-foreground mt-2">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredCompanies.map((company, index) => (
                        <CompanyCard
                          key={`${company.Company}-${index}`}
                          company={company}
                          certifications={certifications}
                          selectedCertifications={selectedCertifications}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-muted mt-auto py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            TrustCenterDB - Security & Compliance Certification Search Engine
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
