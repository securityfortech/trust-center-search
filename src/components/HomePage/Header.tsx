
import React from 'react';
import { Shield } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 pt-20 pb-12 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold text-trust-dark dark:text-white">Trust Center Search</h1>
          </div>
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mb-8 text-xl font-medium">
          Find and explore trust centers from major companies
        </p>
        <div className="w-full max-w-2xl shadow-lg rounded-full">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="mt-8 max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Discover Security & Compliance Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore ISO, SOC, GDPR, and other compliance information from companies like Google, Microsoft, Adobe, and more.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
