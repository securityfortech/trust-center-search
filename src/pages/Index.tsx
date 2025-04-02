
import React, { useEffect } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import DataProvider from '@/components/HomePage/DataProvider';
import CompanyResults from '@/components/HomePage/CompanyResults';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Google Sheets URL
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/197rabmQLoYSnGv-L27yTn2-lzPfXmI059BQQ_UhVevQ/edit?usp=sharing';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Set page title and meta viewport for better mobile experience
  useEffect(() => {
    document.title = "Trust Center Search - Security & Compliance Database";
    
    // Ensure the viewport meta tag is set correctly for mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  return (
    <div className={`min-h-screen bg-background flex flex-col ${isMobile ? 'justify-between' : ''}`}>
      <DataProvider csvUrl={GOOGLE_SHEETS_URL}>
        {({
          companies,
          filteredCompanies,
          isLoading,
          isInitialLoad,
          handleSearch,
          totalCompanies,
        }) => {
          // Show error toast if data fails to load
          useEffect(() => {
            if (companies.length === 0 && !isLoading) {
              toast.error("Error loading company data. Please try again later.", {
                duration: 5000,
              });
            }
          }, [companies.length, isLoading]);

          return (
            <>
              <Header 
                onSearch={handleSearch} 
                totalCompanies={totalCompanies} 
              />
              
              <main className={`container mx-auto ${isMobile ? 'px-2 mt-0' : 'px-4 pb-8 -mt-6'} py-2 ${isMobile ? 'flex-1' : ''}`}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-24">
                    <LoadingIndicator />
                  </div>
                ) : (
                  <div className={`${isMobile ? 'mt-2' : 'mt-0'}`}>
                    <CompanyResults
                      isInitialLoad={isInitialLoad}
                      filteredCompanies={filteredCompanies}
                      companies={companies}
                    />
                  </div>
                )}
              </main>
              
              {isMobile ? (
                <footer className="w-full bg-gray-100 dark:bg-gray-800 py-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="container mx-auto px-4">
                    <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                      <a href="#" className="hover:underline">Settings</a>
                      <a href="#" className="hover:underline">Privacy</a>
                      <a href="#" className="hover:underline">Terms</a>
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
