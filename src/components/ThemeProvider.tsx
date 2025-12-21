import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { personalizationService, UserTheme } from '../services/personalizationService';

interface ThemeContextType {
  theme: UserTheme;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  userId: string;
}

export function ThemeProvider({ children, userId }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<UserTheme>(personalizationService.getCurrentTheme(userId));

  useEffect(() => {
    // Apply theme to document
    applyTheme(theme);
  }, [theme]);

  const setTheme = (themeId: string) => {
    personalizationService.setTheme(userId, themeId);
    const newTheme = personalizationService.getCurrentTheme(userId);
    setThemeState(newTheme);
  };

  const applyTheme = (theme: UserTheme) => {
    const root = document.documentElement;
    
    // Map theme colors to Tailwind color values
    const colorMap: { [key: string]: { [key: number]: string } } = {
      cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63'
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b'
      },
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87'
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843'
      },
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12'
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d'
      },
      teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a'
      },
      amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f'
      },
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12'
      },
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81'
      }
    };

    // Set CSS variables for the theme
    const primaryColors = colorMap[theme.primary] || colorMap.cyan;
    const secondaryColors = colorMap[theme.secondary] || colorMap.blue;
    const accentColors = colorMap[theme.accent] || colorMap.emerald;

    root.style.setProperty('--theme-primary-50', primaryColors[50]);
    root.style.setProperty('--theme-primary-100', primaryColors[100]);
    root.style.setProperty('--theme-primary-200', primaryColors[200]);
    root.style.setProperty('--theme-primary-300', primaryColors[300]);
    root.style.setProperty('--theme-primary-400', primaryColors[400]);
    root.style.setProperty('--theme-primary-500', primaryColors[500]);
    root.style.setProperty('--theme-primary-600', primaryColors[600]);
    root.style.setProperty('--theme-primary-700', primaryColors[700]);
    root.style.setProperty('--theme-primary-800', primaryColors[800]);
    root.style.setProperty('--theme-primary-900', primaryColors[900]);

    root.style.setProperty('--theme-secondary-50', secondaryColors[50]);
    root.style.setProperty('--theme-secondary-100', secondaryColors[100]);
    root.style.setProperty('--theme-secondary-200', secondaryColors[200]);
    root.style.setProperty('--theme-secondary-300', secondaryColors[300]);
    root.style.setProperty('--theme-secondary-400', secondaryColors[400]);
    root.style.setProperty('--theme-secondary-500', secondaryColors[500]);
    root.style.setProperty('--theme-secondary-600', secondaryColors[600]);
    root.style.setProperty('--theme-secondary-700', secondaryColors[700]);
    root.style.setProperty('--theme-secondary-800', secondaryColors[800]);
    root.style.setProperty('--theme-secondary-900', secondaryColors[900]);

    root.style.setProperty('--theme-accent-50', accentColors[50]);
    root.style.setProperty('--theme-accent-100', accentColors[100]);
    root.style.setProperty('--theme-accent-200', accentColors[200]);
    root.style.setProperty('--theme-accent-300', accentColors[300]);
    root.style.setProperty('--theme-accent-400', accentColors[400]);
    root.style.setProperty('--theme-accent-500', accentColors[500]);
    root.style.setProperty('--theme-accent-600', accentColors[600]);
    root.style.setProperty('--theme-accent-700', accentColors[700]);
    root.style.setProperty('--theme-accent-800', accentColors[800]);
    root.style.setProperty('--theme-accent-900', accentColors[900]);

    // Store theme name as data attribute for potential CSS targeting
    root.setAttribute('data-theme', theme.id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
