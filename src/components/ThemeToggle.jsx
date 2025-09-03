import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
    </button>
  );
}
