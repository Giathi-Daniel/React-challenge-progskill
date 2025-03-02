// ThemeToggle.js
import { useTheme } from '../context/useTheme'
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-900"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <svg
        className="w-5 h-5 text-gray-800 dark:text-gray-200 transition-transform duration-300"
        viewBox="0 0 24 24"
        fill="none"
      >
        {theme === 'dark' ? (
          // Sun icon for dark mode
          <path
            d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          // Moon icon for light mode
          <path
            d="M20.3542 15.3542C19.3176 15.7708 18.1856 16.0001 17 16.0001C12.0294 16.0001 8 11.9707 8 7.00015C8 5.81457 8.22925 4.6826 8.64581 3.646C5.33648 4.4498 3 7.41616 3 11.0001C3 15.9707 7.02944 20.0001 12 20.0001C15.5839 20.0001 18.5503 17.6636 19.3541 14.3542Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
};
