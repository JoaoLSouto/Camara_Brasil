import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDark));
        document.body.style.backgroundColor = isDark ? '#1a1a1a' : '#f5f5f5';
        document.body.style.color = isDark ? '#e0e0e0' : '#333';
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const theme = {
        isDark,
        toggleTheme,
        colors: {
            background: isDark ? '#1a1a1a' : '#ffffff',
            backgroundAlt: isDark ? '#2d2d2d' : '#f5f5f5',
            text: isDark ? '#e0e0e0' : '#1a1a1a',
            textSecondary: isDark ? '#a0a0a0' : '#666',
            border: isDark ? '#404040' : '#e0e0e0',
            card: isDark ? '#2d2d2d' : '#ffffff',
            cardHover: isDark ? '#353535' : '#f9f9f9',
            primary: '#28a745',
            primaryHover: '#218838',
            shadow: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
