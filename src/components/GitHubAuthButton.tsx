import React, { useState } from 'react';
import { Github, LogIn, LogOut, CheckCircle2, User, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface GitHubAuthButtonProps {
  compact?: boolean;
  className?: string;
  idPrefix?: string;
}

export const GitHubAuthButton: React.FC<GitHubAuthButtonProps> = ({ 
  compact = false, 
  className = '',
  idPrefix = 'gh-auth'
}) => {
  const { user, isLoading, loginWithGitHub, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (user) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          id={`${idPrefix}-user-menu-btn`}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-slate-200 text-xs font-mono transition-all cursor-pointer shadow-sm"
          title={`Signed in as @${user.login}`}
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-4 h-4 rounded-full border border-cyan-400 object-cover"
          />
          <span className="max-w-[90px] truncate text-cyan-300 font-semibold">@{user.login}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </button>

        {menuOpen && (
          <div 
            className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 p-3 shadow-2xl z-50 font-mono text-xs text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 pb-2.5 mb-2.5 border-b border-slate-800">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-8 h-8 rounded-full border border-cyan-400"
              />
              <div className="overflow-hidden">
                <div className="font-bold text-white truncate">{user.name || user.login}</div>
                <div className="text-[11px] text-cyan-400 truncate">@{user.login}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-400 mb-3">
              <div className="flex items-center justify-between">
                <span>OAuth Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>API Rate Limit:</span>
                <span className="text-cyan-300">5,000 req/hr</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-300 hover:text-cyan-400 flex items-center gap-1"
              >
                <User className="w-3 h-3" />
                <span>Profile</span>
              </a>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={loginWithGitHub}
      disabled={isLoading}
      id={`${idPrefix}-connect-btn`}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-mono shadow-sm cursor-pointer disabled:opacity-50 ${
        compact ? 'p-2' : 'px-3 py-1.5'
      } ${className}`}
      title="Connect with GitHub OAuth (Elevated 5,000 req/hr rate limits)"
      aria-label="Connect GitHub"
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
      ) : (
        <Github className="w-3.5 h-3.5 text-cyan-400" />
      )}
      {!compact && (
        <span>{isLoading ? 'Connecting...' : 'Connect GitHub'}</span>
      )}
    </button>
  );
};
