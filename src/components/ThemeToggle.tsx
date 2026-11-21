import React from 'react';
import { Sun, Moon, Eye, Gauge } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
  idPrefix?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  compact = false, 
  className = '',
  idPrefix = 'navbar'
}) => {
  const { theme, toggleTheme } = useTheme();
  const isHighContrast = theme === 'high-contrast';

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        id={`${idPrefix}-theme-toggle-compact`}
        aria-label={`Switch to ${isHighContrast ? 'Deep Space dark mode' : 'High Contrast day engineering mode'}`}
        title={`Current: ${isHighContrast ? 'High Contrast Mode (Day)' : 'Deep Space Mode (Dark)'} — Click to toggle`}
        className={`p-2 rounded-xl transition-all duration-200 border flex items-center justify-center cursor-pointer ${
          isHighContrast
            ? 'bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-sm'
            : 'bg-slate-900/90 text-cyan-300 border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/50 shadow-sm'
        } ${className}`}
      >
        {isHighContrast ? (
          <Sun className="w-4 h-4 text-amber-700" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-400" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      id={`${idPrefix}-theme-toggle`}
      aria-label={`Switch to ${isHighContrast ? 'Deep Space dark mode' : 'High Contrast day engineering mode'}`}
      title="Toggle between Deep Space (Dark) and High Contrast (Day Engineering Mode)"
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
        isHighContrast
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 shadow-sm'
          : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-cyan-500/50 shadow-sm'
      } ${className}`}
    >
      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
        isHighContrast
          ? 'bg-amber-500 text-white shadow-xs'
          : 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
      }`}>
        {isHighContrast ? (
          <Sun className="w-3.5 h-3.5" />
        ) : (
          <Moon className="w-3.5 h-3.5" />
        )}
      </div>

      <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[10px] uppercase tracking-wider font-bold">
          {isHighContrast ? 'HIGH CONTRAST' : 'DEEP SPACE'}
        </span>
        <span className={`text-[9px] ${isHighContrast ? 'text-slate-600' : 'text-slate-400'}`}>
          {isHighContrast ? 'Day Lab Mode' : 'Dark Mode'}
        </span>
      </div>

      <span className={`w-2 h-2 rounded-full ml-1 ${
        isHighContrast ? 'bg-amber-500 animate-pulse' : 'bg-cyan-400 animate-pulse'
      }`} />
    </button>
  );
};
