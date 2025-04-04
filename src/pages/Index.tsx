
import React, { useEffect } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import Footer from '@/components/HomePage/Footer';
import DataProvider from '@/components/HomePage/DataProvider';
import CompanyResults from '@/components/HomePage/CompanyResults';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/197rabmQLoYSnGv-L27yTn2-lzPfXmI059BQQ_UhVevQ/edit?usp=sharing';

const Index = () => {
  const isMobile = useIsMobile();
  const { trackPageLeave } = useAnalytics();
  
  useEffect(() => {
    document.title = "Trust Center Search - Find Security & Compliance Information";
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Update meta description for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Search and explore trust centers and security compliance information for tech companies at search.securityfortech.com');
    }
    
    // Set up beforeunload event listener to track page leave
    window.addEventListener('beforeunload', trackPageLeave);
    
    return () => {
      window.removeEventListener('beforeunload', trackPageLeave);
    };
  }, [trackPageLeave]);

  return (
    <div className={`min-h-screen bg-background flex flex-col ${isMobile ? 'justify-between' : ''}`}>
      <DataProvider csvUrl={GOOGLE_SHEETS_URL}>
        {({
          companies,
          filteredCompanies,
          isLoading,
          isInitialLoad,
          totalCompanies
        }) => {
          useEffect(() => {
            if (companies.length === 0 && !isLoading) {
              toast.error("Error loading company data. Please try again later.", {
                duration: 5000
              });
            }
          }, [companies.length, isLoading]);
          
          return (
            <>
              <main className="flex-grow px-4 md:px-6 lg:px-8 pt-4 pb-8">
                {isLoading ? (
                  <div className="flex justify-center items-center h-24">
                    <LoadingIndicator />
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <CompanyResults 
                      isInitialLoad={isInitialLoad} 
                      filteredCompanies={filteredCompanies} 
                      companies={companies} 
                    />
                  </div>
                )}
              </main>
              
              {isMobile ? (
                <footer className="w-full bg-white dark:bg-gray-800 py-4 mt-2 border-t border-gray-200 dark:border-gray-700 shadow-[0_-1px_2px_rgba(0,0,0,0.03)]">
                  <div className="container mx-auto px-4">
                    <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                      <Link to="/add-trust-center" className="hover:text-primary transition-colors">Add your Trust Center</Link>
                      <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                      <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    </div>
                  </div>
                </footer>
              ) : (
                <Footer />
              )}
            </>
          );
        }}
      </DataProvider>
    </div>
  );
};

export default Index;
