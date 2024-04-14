import React, { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext.tsx';

const LoadingSpinner: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="flex justify-center">
      <div
        className={`w-12 h-12 border-4 border-t-4 rounded-full animate-spin ${
          isDarkMode
            ? 'border-gray-400 border-t-gray-200'
            : 'border-gray-200 border-t-gray-400'
        }`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
