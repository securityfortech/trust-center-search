
import React from 'react';
import { Shield, Search } from 'lucide-react';
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
    return (
      <header className="bg-background dark:bg-gray-900 pt-6 pb-3 flex flex-col items-center justify-center animate-fade-in">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="mb-8 mt-3 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-7 w-7 text-primary mr-2 animate-pulse-slow" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Trust Center</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
              Find and explore Trust Centers from <span className="font-semibold text-primary">{totalCompanies}</span> leading companies
            </p>
          </div>
          
          <div className="w-full max-w-full px-4 mb-1">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </header>
    );
  }
  
  return (
    <header className="bg-background dark:bg-gray-900 flex flex-col items-center justify-center min-h-[30vh] pb-2 animate-fade-in relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 flex flex-col items-center relative">
        <div className="mb-12 md:mb-14 text-center animate-slide-down">
          <div className="flex items-center justify-center mb-3">
            <Shield className="h-12 w-12 md:h-16 md:w-16 text-primary mr-3 animate-pulse-slow" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trust Center Search
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 md:mt-5 max-w-lg mx-auto">
            Find and explore Trust Centers from <span className="font-semibold text-primary">{totalCompanies}</span> leading companies
          </p>
        </div>
        
        <div className="w-full max-w-2xl mb-1 relative animate-slide-up">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10 opacity-70"></div>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
