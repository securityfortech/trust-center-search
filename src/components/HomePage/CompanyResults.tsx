
import React from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from './DataProvider';

interface CompanyResultsProps {
  isInitialLoad: boolean;
  filteredCompanies: CompanyData[];
  companies: CompanyData[];
  certifications: string[];
  selectedCertifications: string[];
}

const CompanyResults: React.FC<CompanyResultsProps> = ({
  isInitialLoad,
  filteredCompanies,
  companies,
  certifications,
  selectedCertifications,
}) => {
  if (isInitialLoad) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">Start searching or select certifications to discover companies</p>
        <p className="text-muted-foreground mt-2">
          Use the search bar or certification filters to find trust centers
        </p>
      </div>
    );
  }

  return (
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
  );
};

export default CompanyResults;
