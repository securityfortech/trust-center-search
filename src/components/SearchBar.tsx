
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for a company..." 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isMobile = useIsMobile();

  // Effect to trigger search when searchTerm changes with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms debounce delay to avoid too many searches

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-full mx-auto">
        <div className="relative flex items-center">
          <div className="w-full bg-white dark:bg-gray-800 rounded-full overflow-hidden flex items-center px-4 py-2 shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-trust-primary/20">
            <Search className="h-5 w-5 text-trust-primary flex-shrink-0" />
            <Input
              type="search"
              value={searchTerm}
              onChange={handleChange}
              className="border-0 bg-transparent pl-3 pr-2 py-2 w-full h-10 focus:ring-0 focus:outline-none text-base"
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label="Search for a company"
            />
            {searchTerm && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-trust-primary hover:text-trust-dark hover:bg-trust-light/10" 
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <div className="relative flex items-center">
        <div className={`w-full flex items-center px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full transition-all duration-300 ${isFocused ? 'shadow-[0_0_0_2px_rgba(42,111,151,0.2)]' : 'shadow-md hover:shadow-lg'}`}>
          <Search className="h-5 w-5 text-trust-primary flex-shrink-0" />
          <Input
            type="search"
            value={searchTerm}
            onChange={handleChange}
            className="border-0 bg-transparent ml-3 flex-grow h-10 focus:ring-0 focus:outline-none text-lg"
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Search for a company"
          />
          {searchTerm && (
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 mr-1 text-trust-primary hover:text-trust-dark hover:bg-trust-light/10 rounded-full" 
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-center text-trust-primary/70">
        Type at least 2 characters to start searching
      </div>
    </form>
  );
};

export default SearchBar;
