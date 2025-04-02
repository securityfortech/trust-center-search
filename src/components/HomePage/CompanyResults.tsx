
import React, { useEffect } from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from '@/hooks/useCompanyData';
import { Search } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

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
  const analytics = useAnalytics();
  
  useEffect(() => {
    if (filteredCompanies.length > 0 && !isInitialLoad) {
      analytics.capture('viewed_company_results', {
        count: filteredCompanies.length,
        total_companies: companies.length
      });
    }
  }, [filteredCompanies.length, isInitialLoad, companies.length, analytics]);

  if (isInitialLoad) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3 animate-fade-in">
        <Search className="h-10 w-10 text-gray-400" />
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200 text-center">
          Search for a company
        </p>
        <p className="text-muted-foreground text-center max-w-md px-4">
          Type a company name to start exploring trust centers and security compliance
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-gray-900 rounded-lg py-4">
      {filteredCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 space-y-3">
          <p className="text-xl font-medium text-gray-800 dark:text-gray-200 text-center">
            No companies found
          </p>
          <p className="text-muted-foreground text-center max-w-md px-4">
            Try a different search term or browse all companies
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6">
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
