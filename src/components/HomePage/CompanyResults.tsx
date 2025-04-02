
import React from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from '@/hooks/useCompanyData';
import { Search } from 'lucide-react';

interface CompanyResultsProps {
  isInitialLoad: boolean;
  filteredCompanies: CompanyData[];
  companies: CompanyData[];
}

const CompanyResults: React.FC<CompanyResultsProps> = ({
  isInitialLoad,
  filteredCompanies,
  companies
}) => {
  if (isInitialLoad) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <Search className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">Search for a company</p>
        <p className="text-muted-foreground mt-2 text-center max-w-md">
          Type a company name to start exploring trust centers and security compliance
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {filteredCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl font-medium text-gray-800 dark:text-gray-200">No companies found</p>
          <p className="text-muted-foreground mt-2 text-center max-w-md">
            Try a different search term or browse all companies
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCompanies.map((company, index) => (
            <CompanyCard 
              key={`${company.Company}-${index}`} 
              company={company} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyResults;
