import React, { useContext } from 'react';
import { SearchResults, NormalizedImage } from '../../../shared/types.ts';
import { ThemeContext } from '../theme/ThemeContext.tsx';
import LoadingSpinner from '../common/LoadingSpinner.tsx';
import ImageItem from './ImageItem.tsx';

interface ImageGridProps {
  results: SearchResults | null;
  isLoading: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ results, isLoading }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const normalizeImageData = (
    results: SearchResults | null
  ): NormalizedImage[] => {
    if (!results) {
      return [];
    }

    const isUnsplashResults = 'results' in results;
    const isPexelsResults = 'photos' in results;

    if (isUnsplashResults) {
      return results.results.map((item) => ({
        id: item.id,
        src: item.urls.regular,
        alt: item.alt_description,
      }));
    } else if (isPexelsResults) {
      return results.photos.map((item) => ({
        id: item.id,
        src: item.src.medium,
        alt: item.alt,
      }));
    }

    return [];
  };

  const images = normalizeImageData(results);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-72 mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center h-72 mt-10">
        <div className="text-center">
          <h2
            className={`text-4xl font-semibold mb-4 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            Welcome to Image Search 👋
          </h2>
          <p
            className={`text-xl ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Start exploring by entering a search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGrid;
