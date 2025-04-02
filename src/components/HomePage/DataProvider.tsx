
import React from 'react';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useCompanyFilter } from '@/hooks/useCompanyFilter';

interface DataProviderProps {
  children: (props: {
    companies: ReturnType<typeof useCompanyData>['companies'];
    filteredCompanies: ReturnType<typeof useCompanyFilter>['filteredCompanies'];
    certifications: ReturnType<typeof useCompanyData>['certifications'];
    selectedCertifications: ReturnType<typeof useCompanyFilter>['selectedCertifications'];
    searchTerm: ReturnType<typeof useCompanyFilter>['searchTerm'];
    isLoading: ReturnType<typeof useCompanyData>['isLoading'];
    isInitialLoad: ReturnType<typeof useCompanyFilter>['isInitialLoad'];
    handleSearch: ReturnType<typeof useCompanyFilter>['handleSearch'];
    handleToggleCertification: ReturnType<typeof useCompanyFilter>['handleToggleCertification'];
  }) => React.ReactNode;
  csvUrl: string;
}

const DataProvider: React.FC<DataProviderProps> = ({ children, csvUrl }) => {
  // Use the company data hook to fetch data
  const { companies, certifications, isLoading } = useCompanyData(csvUrl);
  
  // Use the filter hook to handle filtering logic
  const {
    filteredCompanies,
    selectedCertifications,
    searchTerm,
    isInitialLoad,
    handleSearch,
    handleToggleCertification
  } = useCompanyFilter(companies, certifications);

  return children({
    companies,
    filteredCompanies,
    certifications,
    selectedCertifications,
    searchTerm,
    isLoading,
    isInitialLoad,
    handleSearch,
    handleToggleCertification,
  });
};

export default DataProvider;
