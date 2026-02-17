import { useEffect, useState } from 'react';
import type { Theme } from '@/types/theme-context-types';
import { ThemeContext } from '@/types/theme-context-types';

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
}

export const ThemeProvider = ({ children, defaultTheme = 'system' }: ThemeProviderProps) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Get saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || defaultTheme;
    });

    const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

    // Detect system preference
    const getSystemTheme = (): 'light' | 'dark' => {
        if (typeof window === 'undefined') return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme to document
    const applyTheme = (newTheme: 'light' | 'dark') => {
        const root = document.documentElement;

        // Remove both classes first
        root.classList.remove('light', 'dark');

        // Add the new theme class
        root.classList.add(newTheme);

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#1f2937' : '#ffffff');
        }

        setActualTheme(newTheme);
    };

    // Set theme function
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);

        const effectiveTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
        applyTheme(effectiveTheme);
    };

    // Handle initial theme and system changes
    useEffect(() => {
        const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
        applyTheme(effectiveTheme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
