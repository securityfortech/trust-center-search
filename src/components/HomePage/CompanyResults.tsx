import React from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from '@/hooks/useCompanyData';
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
    return <div className="text-center py-12">
        <p className="text-lg font-medium">Search for a company</p>
        <p className="text-muted-foreground mt-2">
          Type a company name to start searching
        </p>
      </div>;
  }
  return <>
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredCompanies.length} of {companies.length} companies
      </p>
      
      {filteredCompanies.length === 0 ? <div className="text-center py-12">
          <p className="text-lg font-medium">No companies found</p>
          <p className="text-muted-foreground mt-2">
            Try a different search term
          </p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company, index) => <CompanyCard key={`${company.Company}-${index}`} company={company} />)}
        </div>}
    </>;
};
export default CompanyResults;