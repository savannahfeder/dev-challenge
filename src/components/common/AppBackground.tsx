import React, { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext.tsx';

interface AppBackgroundProps {
  children: React.ReactNode;
}

const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {children}
    </div>
  );
};

export default AppBackground;
