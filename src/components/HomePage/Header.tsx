
import React from 'react';
import { Search } from 'lucide-react';
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
              <h1 className="text-3xl font-bold">TrustSource</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              Find and explore Trust Centers from <span className="font-semibold">{totalCompanies}</span> leading companies
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
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full opacity-[0.02]" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" 
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center relative">
        <div className="mb-12 md:mb-14 text-center animate-slide-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            TrustSource
          </h1>
          <p className="text-lg text-muted-foreground mt-4 md:mt-5 max-w-lg mx-auto">
            Find and explore Trust Centers from <span className="font-semibold">{totalCompanies}</span> leading companies
          </p>
        </div>
        
        <div className="w-full max-w-2xl mb-1 relative animate-slide-up">
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl blur-xl -z-10 opacity-70"></div>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
