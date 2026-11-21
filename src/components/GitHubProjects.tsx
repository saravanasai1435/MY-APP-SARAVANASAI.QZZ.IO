import React, { useState, useMemo } from 'react';
import { 
  Github, 
  GitFork, 
  Star, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Code2, 
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { GitHubRepo } from '../types';
import { GITHUB_USERNAME, GITHUB_PROFILE_URL } from '../services/github';
import { GitHubAuthButton } from './GitHubAuthButton';
import { useAuth } from '../context/AuthContext';

interface GitHubProjectsProps {
  repos: GitHubRepo[];
  isLoading: boolean;
  isLive: boolean;
  rateLimited?: boolean;
  errorMessage?: string;
  onRefresh: () => void;
}

export const GitHubProjects: React.FC<GitHubProjectsProps> = ({
  repos,
  isLoading,
  isLive,
  rateLimited,
  errorMessage,
  onRefresh,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Repos' },
    { id: 'arduino', label: 'Arduino' },
    { id: 'esp32', label: 'ESP32' },
    { id: 'python', label: 'Python' },
    { id: 'web', label: 'Web' },
    { id: 'other', label: 'Other' },
  ];

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'c++':
      case 'cpp':
        return 'text-blue-400 bg-blue-950/60 border-blue-800/50';
      case 'c':
        return 'text-sky-400 bg-sky-950/60 border-sky-800/50';
      case 'python':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800/50';
      case 'typescript':
      case 'javascript':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/50';
      case 'html':
      case 'css':
        return 'text-orange-400 bg-orange-950/60 border-orange-800/50';
      default:
        return 'text-slate-300 bg-slate-800/80 border-slate-700';
    }
  };

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      if (filter === 'all') return true;
      const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${repo.language || ''}`.toLowerCase();
      
      if (filter === 'arduino') return text.includes('arduino');
      if (filter === 'esp32') return text.includes('esp32');
      if (filter === 'python') return text.includes('python') || repo.language?.toLowerCase() === 'python';
      if (filter === 'web') return text.includes('web') || text.includes('react') || text.includes('typescript') || text.includes('javascript') || text.includes('portfolio');
      if (filter === 'other') {
        return !text.includes('arduino') && !text.includes('esp32') && !text.includes('python') && !text.includes('web');
      }
      return true;
    });
  }, [repos, filter]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="github" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs mb-3">
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GITHUB REPOSITORIES • @{GITHUB_USERNAME}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Public Codebases &amp; Firmware
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-1.5">
              Live repositories fetched from GitHub featuring microcontroller firmware, circuit libraries, and open-source project code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* GitHub OAuth Sign-in & Authentication */}
            <GitHubAuthButton idPrefix="gh-section" />

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
              title="Refresh repositories with elevated GitHub API limit"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sync Repos</span>
            </button>

            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* OAuth Integration & High Rate Limit Notice */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Zap className="w-3 h-3" />
            </span>
            <span>
              GitHub OAuth App: <code className="text-cyan-300 font-semibold px-1 py-0.5 rounded bg-slate-950">Ov23liPlf0tRKt04LObk</code>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Elevated API Rate Limit (5,000 req/hr) Active
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            {isLive ? (
              <span className="text-emerald-400 font-semibold">● Live Sync Connected</span>
            ) : (
              <span className="text-amber-400">● Cached Mode</span>
            )}
          </div>
        </div>

        {/* Sync Status / Rate-Limit Alert Banner */}
        {rateLimited && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs font-mono flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>GitHub API hourly unauthenticated limit active. Displaying cached repository data for @{GITHUB_USERNAME}.</span>
            </div>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-amber-300 hover:text-white shrink-0"
            >
              Visit Profile Directly
            </a>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                filter === opt.id
                  ? 'bg-cyan-950 border border-cyan-500/60 text-cyan-300 font-semibold shadow-sm'
                  : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 animate-pulse h-44 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-850 rounded w-full" />
                  <div className="h-3 bg-slate-850 rounded w-2/3" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-3 bg-slate-800 rounded w-16" />
                  <div className="h-3 bg-slate-800 rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRepos.length > 0 ? (
          /* Repositories Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                id={`github-repo-${repo.name}`}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-cyan-500/40 shadow-lg hover:shadow-xl hover:shadow-cyan-950/20 transition-all"
              >
                <div>
                  {/* Top Bar: Icon + External Link Arrow */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-[11px] font-mono text-slate-500">saravanasai1435 /</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Repo Name */}
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {repo.description || 'Public engineering repository and embedded firmware codebase.'}
                  </p>

                  {/* Topics Pills */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800/90 text-slate-400"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Metrics: Language, Stars, Forks, Date */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${getLanguageColor(repo.language)}`}>
                        {repo.language}
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-slate-300" title="Stars">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400/30" />
                      <span className="text-[11px]">{repo.stargazers_count}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400" title="Forks">
                      <GitFork className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px]">{repo.forks_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500" title={`Last updated: ${repo.updated_at}`}>
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
            <Github className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-300 text-sm font-medium">No repositories match this filter.</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-3 text-xs font-mono text-cyan-400 hover:underline"
            >
              Show all repositories
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
