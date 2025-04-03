
import React, { useEffect, useState } from 'react';
import CompanyCard from '@/components/CompanyCard';
import { CompanyData } from '@/hooks/useCompanyData';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from '@/hooks/use-mobile';

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

  // Result count display
  const resultSummary = (
    <div className="mb-4 px-4">
      <p className="text-sm text-muted-foreground">
        {filteredCompanies.length === 0 ? (
          "No results found"
        ) : (
          <>Found <span className="font-medium">{filteredCompanies.length}</span> trust centers</>
        )}
      </p>
    </div>
  );

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
        <>
          <div className="flex justify-between items-center mb-4 px-4 md:px-6">
            {resultSummary}
            {!isMobile && (
              <div className="flex space-x-1">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
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
          
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      aria-disabled={currentPage === 1}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, and pages around current page
                      return page === 1 || 
                             page === totalPages || 
                             (page >= currentPage - 1 && page <= currentPage + 1);
                    })
                    .map((page, i, array) => {
                      // Add ellipsis where needed
                      const prevPage = array[i - 1];
                      const needsEllipsisBefore = prevPage && page - prevPage > 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {needsEllipsisBefore && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      aria-disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
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
