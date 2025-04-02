
import React from 'react';
import { Shield } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-trust-dark dark:text-white">
              TrustCenterDB
            </h1>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl">
            Search for a company
          </p>
          <div className="w-full max-w-3xl mt-4">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
