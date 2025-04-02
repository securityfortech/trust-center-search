
import React from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import DataProvider from '@/components/HomePage/DataProvider';
import CompanyResults from '@/components/HomePage/CompanyResults';

// Google Sheets URL
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/197rabmQLoYSnGv-L27yTn2-lzPfXmI059BQQ_UhVevQ/edit?usp=sharing';

const Index = () => {
  console.log("Index page rendering");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DataProvider csvUrl={GOOGLE_SHEETS_URL}>
        {({
          companies,
          filteredCompanies,
          isLoading,
          isInitialLoad,
          handleSearch,
        }) => {
          console.log("DataProvider rendered with", companies.length, "companies");
          return (
            <>
              <Header onSearch={handleSearch} />
              
              <main className="container mx-auto px-4 py-6 flex-grow">
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <LoadingIndicator />
                  </div>
                ) : (
                  <div className="mt-6">
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
