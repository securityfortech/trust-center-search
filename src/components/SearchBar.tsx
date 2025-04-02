import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
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
    // We'll still handle submit for accessibility and when users press Enter
    onSearch(searchTerm);
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-full mx-auto">
        <div className="relative flex items-center">
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex items-center px-4 py-2 shadow-sm">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <Input
              type="search"
              value={searchTerm}
              onChange={handleChange}
              className="border-0 bg-transparent pl-3 pr-2 py-2 w-full h-10 focus:ring-0 focus:outline-none text-base"
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Mic className="h-5 w-5 text-primary flex-shrink-0" />
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <div className="relative flex items-center shadow-lg hover:shadow-xl transition-shadow rounded-full overflow-hidden">
        <div className="w-full flex items-center px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <Input
            type="search"
            value={searchTerm}
            onChange={handleChange}
            className="border-0 bg-transparent ml-3 flex-grow h-10 focus:ring-0 focus:outline-none text-lg"
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Mic className="h-5 w-5 text-primary flex-shrink-0 mx-2" />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button 
          type="submit"
          className="bg-gray-50 hover:bg-gray-100 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium mx-2 px-6 py-2 rounded-md"
        >
          Search 
        </Button>
        <Button 
          type="button"
          variant="ghost"
          className="bg-gray-50 hover:bg-gray-100 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium mx-2 px-6 py-2 rounded-md"
        >
          I'm Feeling Lucky
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
