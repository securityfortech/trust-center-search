
import React from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import DataProvider from '@/components/HomePage/DataProvider';
import CompanyResults from '@/components/HomePage/CompanyResults';

const CSV_URL = 'https://raw.githubusercontent.com/securityfortech/trust-center-db/refs/heads/main/Trust_Center_Certification_CSV.csv?token=GHSAT0AAAAAAC666XH55I25T2CXJ2TPRMLUZ7MUJFQ';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DataProvider csvUrl={CSV_URL}>
        {({
          companies,
          filteredCompanies,
          isLoading,
          isInitialLoad,
          handleSearch,
        }) => (
          <>
            <Header onSearch={handleSearch} />
            
            <main className="container mx-auto px-4 py-6">
              {isLoading ? (
                <LoadingIndicator />
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
        )}
      </DataProvider>
    </div>
  );
};

export default Index;
