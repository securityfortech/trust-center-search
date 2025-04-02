
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

  return (
    <header className="bg-white dark:bg-gray-900 pt-8 md:pt-16 pb-6 md:pb-10 flex flex-col items-center justify-center animate-fade-in">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-3 md:mb-5">
          <div className="flex items-center justify-center">
            <Shield className="h-8 w-8 md:h-12 md:w-12 text-primary mr-2 md:mr-3" />
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-trust-dark dark:text-white">Trust Center Search</h1>
          </div>
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mb-4 md:mb-6 text-base md:text-lg lg:text-xl font-medium px-2">
          Find and explore Trust Centers from {totalCompanies} leading companies
        </p>
        <div className="w-full max-w-2xl shadow-lg rounded-full mb-4 md:mb-6 px-2 md:px-0">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="mt-2 md:mt-4 max-w-2xl text-center px-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Discover Security & Compliance Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3 md:mb-4 text-sm md:text-base">Explore ISO, SOC, and other compliance information from leading tech companies.</p>
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
