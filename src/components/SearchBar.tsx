
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          className={`pl-12 pr-4 py-3 w-full rounded-l-full h-12 text-lg transition-all duration-200 border-2 ${
            isFocused ? 'border-primary shadow-sm' : 'border-gray-200 dark:border-gray-700'
          }`}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <Button 
        type="submit"
        className="rounded-r-full h-12 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 font-medium text-base shadow-md hover:shadow-lg"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
