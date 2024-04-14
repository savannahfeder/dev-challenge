import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/theme/ThemeContext.tsx';
import AppBackground from './components/common/AppBackground.tsx';
import SearchBar from './components/search/SearchBar.tsx';
import ImageGrid from './components/imageGrid/ImageGrid.tsx';
import PaginationButtons from './components/pagination/PaginationButtons.tsx';
import DarkModeToggle from './components/theme/DarkModeToggle.tsx';
import { SearchResults } from '../shared/types.ts';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const perPage = 9;

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      const apiToUse = currentPage % 2 === 1 ? 'unsplash' : 'pexels';
      const apiPage = Math.ceil(currentPage / 2);
      const response = await fetch(
        `http://localhost:3001/search?query=${query}&page=${apiPage}&perPage=${perPage}&api=${apiToUse}`
      );
      const data: SearchResults = await response.json();
      setSearchResults(data);
      setSearchQuery(query);
      updateTotalResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTotalResults = (data: SearchResults) => {
    const isFirstPageUnsplash = currentPage === 1 && 'total' in data;
    const isSecondPagePexels = currentPage === 2 && 'total_results' in data;

    if (isFirstPageUnsplash) {
      setTotalResults(data.total);
    } else if (isSecondPagePexels) {
      setTotalResults((prevTotal) => prevTotal + data.total_results);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getTotalPages = (): number => {
    return Math.ceil(totalResults / perPage);
  };

  const totalPages = getTotalPages();

  return (
    <ThemeProvider>
      <AppBackground>
        <div>
          <DarkModeToggle />
          <main className="container px-4 py-8 w-8/12 mx-auto">
            <SearchBar onSearch={handleSearch} />
            <ImageGrid results={searchResults} isLoading={isLoading} />
            {searchResults && (
              <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={() => setCurrentPage((prev) => prev - 1)}
                onNextPage={() => setCurrentPage((prev) => prev + 1)}
              />
            )}
          </main>
        </div>
      </AppBackground>
    </ThemeProvider>
  );
};

export default App;
