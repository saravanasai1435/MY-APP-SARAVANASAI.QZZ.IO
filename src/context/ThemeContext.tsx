import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'deep-space' | 'high-contrast';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'saravanasai_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (savedTheme === 'deep-space' || savedTheme === 'high-contrast') {
        return savedTheme;
      }
    }
    return 'deep-space';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'high-contrast') {
      root.classList.add('theme-high-contrast');
      root.setAttribute('data-theme', 'high-contrast');
    } else {
      root.classList.remove('theme-high-contrast');
      root.setAttribute('data-theme', 'deep-space');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'deep-space' ? 'high-contrast' : 'deep-space'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
