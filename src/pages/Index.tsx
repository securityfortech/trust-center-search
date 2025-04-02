
import React, { useEffect } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import DataProvider from '@/components/HomePage/DataProvider';
import CompanyResults from '@/components/HomePage/CompanyResults';
import { toast } from '@/components/ui/sonner';

// Google Sheets URL
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/197rabmQLoYSnGv-L27yTn2-lzPfXmI059BQQ_UhVevQ/edit?usp=sharing';

const Index = () => {
  // Set page title
  useEffect(() => {
    document.title = "Trust Center Search - Security & Compliance Database";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              
              <main className="container mx-auto px-4 py-6 flex-grow">
                {isLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <LoadingIndicator />
                  </div>
                ) : (
                  <div className="mt-4">
                    <CompanyResults
                      isInitialLoad={isInitialLoad}
                      filteredCompanies={filteredCompanies}
                      companies={companies}
                    />
                  </div>
                )}
              </main>
              
              <Footer />
            </>
          );
        }}
      </DataProvider>
    </div>
  );
};

export default Index;
