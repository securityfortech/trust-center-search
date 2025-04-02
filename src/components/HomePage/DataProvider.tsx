
import React from 'react';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useCompanyFilter } from '@/hooks/useCompanyFilter';

interface DataProviderProps {
  children: (props: {
    companies: ReturnType<typeof useCompanyData>['companies'];
    filteredCompanies: ReturnType<typeof useCompanyFilter>['filteredCompanies'];
    isLoading: ReturnType<typeof useCompanyData>['isLoading'];
    isInitialLoad: ReturnType<typeof useCompanyFilter>['isInitialLoad'];
    handleSearch: ReturnType<typeof useCompanyFilter>['handleSearch'];
    totalCompanies: number;
  }) => React.ReactNode;
  csvUrl: string;
}

const DataProvider: React.FC<DataProviderProps> = ({ children, csvUrl }) => {
  // Use the company data hook to fetch data
  const { companies, isLoading } = useCompanyData(csvUrl);
  
  // Use the filter hook to handle filtering logic
  const {
    filteredCompanies,
    isInitialLoad,
    handleSearch,
  } = useCompanyFilter(companies);

  return children({
    companies,
    filteredCompanies,
    isLoading,
    isInitialLoad,
    handleSearch,
    totalCompanies: companies.length,
  });
};

export default DataProvider;
