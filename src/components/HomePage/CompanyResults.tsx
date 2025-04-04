
import React, { useEffect, useState } from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from '@/hooks/useCompanyData';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useIsMobile } from '@/hooks/use-mobile';
import ViewModeToggle from './ViewModeToggle';
import ResultSummary from './ResultSummary';
import ResultsPagination from './ResultsPagination';
import NoResultsView from './NoResultsView';

interface CompanyResultsProps {
  isInitialLoad: boolean;
  filteredCompanies: CompanyData[];
  companies: CompanyData[];
}

const ITEMS_PER_PAGE = 12;

const CompanyResults: React.FC<CompanyResultsProps> = ({
  isInitialLoad,
  filteredCompanies,
  companies
}) => {
  const analytics = useAnalytics();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Reset to page 1 when filtered results change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCompanies.length]);
  
  useEffect(() => {
    if (filteredCompanies.length > 0 && !isInitialLoad) {
      analytics.capture('viewed_company_results', {
        count: filteredCompanies.length,
        total_companies: companies.length
      });
    }
  }, [filteredCompanies.length, isInitialLoad, companies.length, analytics]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInitialLoad) {
    return <NoResultsView isInitialLoad={true} />;
  }

  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-gray-900 rounded-lg py-4">
      {filteredCompanies.length === 0 ? (
        <NoResultsView isInitialLoad={false} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 px-4 md:px-6">
            <ResultSummary filteredCompaniesCount={filteredCompanies.length} />
            {!isMobile && (
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            )}
          </div>
          
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" 
              : "flex flex-col space-y-4",
            "px-4 md:px-6"
          )}>
            {currentCompanies.map((company, index) => (
              <CompanyCard 
                key={`${company.Company}-${index}`} 
                company={company} 
                layout={viewMode}
              />
            ))}
          </div>
          
          <ResultsPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

// Helper function to conditionally join classNames
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default CompanyResults;
