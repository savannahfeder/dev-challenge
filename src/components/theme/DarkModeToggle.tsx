import React, { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext.tsx';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      className={`fixed top-4 right-4 p-2 rounded-full  focus:outline-none ${
        isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
      }`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-600" />
      )}
    </button>
  );
};

export default DarkModeToggle;
