import React from 'react';
import { Shield } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  totalCompanies: number;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  totalCompanies
}) => {
  const isMobile = useIsMobile();
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      duration: 3000,
    });
  };

  if (isMobile) {
    return (
      <header className="bg-background dark:bg-gray-900 pt-6 pb-4 flex flex-col items-center justify-center animate-fade-in">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="mb-8 mt-4">
            <div className="flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-3xl font-bold text-trust-dark dark:text-white">Trust Center</h1>
            </div>
          </div>
          
          <div className="w-full max-w-full px-4 mb-8">
            <SearchBar onSearch={onSearch} />
          </div>
          
          {/* No additional text on mobile - Google-like */}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-center">
            <Shield className="h-10 w-10 md:h-14 md:w-14 text-primary mr-3" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-trust-dark dark:text-white">Trust Center</h1>
          </div>
        </div>
        
        <div className="w-full max-w-2xl mb-8 md:mb-10">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="text-center max-w-md">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Find and explore Trust Centers from {totalCompanies} leading companies
          </p>
          <button 
            onClick={handleCopyLink}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Share this tool
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
