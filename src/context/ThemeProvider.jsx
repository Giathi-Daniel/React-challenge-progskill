// ThemeProvider.js
import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // localstorage handling
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemDark ? 'dark' : 'light';
      } catch (e) {
        console.error('LocalStorage access failed', e);
        return 'light';
      }
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('LocalStorage write failed', e);
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }), [theme]);

  return <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that 'children' is required and a valid React node
};
