
import React from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from '@/hooks/useCompanyData';
import { Building } from 'lucide-react';

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
      <div className="text-center py-12">
        <p className="text-lg font-medium">Search for a company</p>
        <p className="text-muted-foreground mt-2">
          Type a company name to start searching
        </p>
        {companies.length > 0 && (
          <div className="mt-6 flex justify-center items-center">
            <div className="bg-primary/10 rounded-lg px-4 py-3 inline-flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <span>
                <strong>{companies.length}</strong> companies listed
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCompanies.length} of {companies.length} companies
        </p>
        <div className="bg-primary/10 rounded-lg px-3 py-2 inline-flex items-center gap-2">
          <Building className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {companies.length} companies listed
          </span>
        </div>
      </div>
      
      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No companies found</p>
          <p className="text-muted-foreground mt-2">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company, index) => (
            <CompanyCard key={`${company.Company}-${index}`} company={company} />
          ))}
        </div>
      )}
    </>
  );
};

export default CompanyResults;
