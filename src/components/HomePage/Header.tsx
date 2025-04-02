
import React from 'react';
import { Shield } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  totalCompanies: number;
}
const Header: React.FC<HeaderProps> = ({
  onSearch,
  totalCompanies
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <header className="bg-background dark:bg-gray-900 pt-4 pb-2 flex flex-col items-center justify-center animate-fade-in">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="mb-3 mt-2 text-center">
            <div className="flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-3xl font-bold text-trust-dark dark:text-white">Trust Center</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Find and explore Trust Centers from {totalCompanies} leading companies
            </p>
          </div>
          
          <div className="w-full max-w-full px-4 mb-1">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </header>;
  }
  return <header className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center min-h-[25vh] pb-2 animate-fade-in">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-3 md:mb-3 text-center">
          <div className="flex items-center justify-center">
            <Shield className="h-10 w-10 md:h-14 md:w-14 text-primary mr-3" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-trust-dark dark:text-white">Trust Center Search</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
            Find and explore Trust Centers from {totalCompanies} leading companies
          </p>
        </div>
        
        <div className="w-full max-w-2xl mb-1">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </header>;
};
export default Header;
