import React, { useContext } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ThemeContext } from '../theme/ThemeContext.tsx';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  const { isDarkMode } = useContext(ThemeContext);

  const getButtonClassName = (disabled: boolean) => {
    const baseClassName =
      'absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none focus:ring-2';

    const disabledClassName = `text-gray-300 cursor-not-allowed ${
      isDarkMode ? 'dark:text-gray-600' : ''
    }`;

    const enabledClassName = `text-gray-600 hover:bg-gray-100 focus:ring-gray-300 ${
      isDarkMode
        ? 'dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        : ''
    }`;

    return `${baseClassName} ${
      disabled ? disabledClassName : enabledClassName
    }`;
  };

  return (
    <>
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`${getButtonClassName(currentPage === 1)} left-4`}
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`${getButtonClassName(currentPage === totalPages)} right-4`}
      >
        <FaChevronRight size={24} />
      </button>
    </>
  );
};

export default PaginationButtons;
