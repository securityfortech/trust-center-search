
import React from 'react';
import { Search } from 'lucide-react';

interface NoResultsViewProps {
  isInitialLoad: boolean;
}

const NoResultsView: React.FC<NoResultsViewProps> = ({ isInitialLoad }) => {
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
  
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <p className="text-xl font-medium text-gray-800 dark:text-gray-200 text-center">
        No companies found
      </p>
      <p className="text-muted-foreground text-center max-w-md px-4">
        Try a different search term or browse all companies
      </p>
    </div>
  );
};

export default NoResultsView;
