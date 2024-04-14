import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../theme/ThemeContext.tsx';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-4xl">
        <input
          type="text"
          placeholder="Search images"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-3 pl-12 bg-gray-100 border border-transparent rounded-lg focus:outline-none ${
            isDarkMode ? 'dark:bg-gray-800 dark:text-white' : ''
          }`}
        />
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <FaSearch
            className={`h-4 w-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-400'
            }`}
          />
        </div>
        <button
          onClick={handleSearch}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md transition duration-300 focus:outline-none ${
            isDarkMode
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
