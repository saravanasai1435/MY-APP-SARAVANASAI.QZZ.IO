import React from 'react';
import { Cpu, GitBranch, Wrench, FlaskConical, Radio } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { TECH_STACK } from '../data/skills';
import { TIMELINE_ENTRIES } from '../data/timeline';

interface StatsProps {
  repoCount: number;
  isRepoLive: boolean;
}

export const Stats: React.FC<StatsProps> = ({ repoCount, isRepoLive }) => {
  const hardwareProjectsCount = PROJECTS.length;
  const technologiesCount = TECH_STACK.length;
  const experimentsCount = TIMELINE_ENTRIES.length + 3; // Documented engineering milestones

  const stats = [
    {
      id: 'stat-projects',
      label: 'Practical Projects',
      value: `${hardwareProjectsCount}`,
      suffix: '+',
      description: 'Documented working hardware & software builds',
      icon: Cpu,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30'
    },
    {
      id: 'stat-repos',
      label: 'GitHub Repositories',
      value: `${repoCount || 7}`,
      suffix: '',
      description: isRepoLive ? 'Dynamically retrieved from GitHub API' : 'Public codebases & firmware repos',
      icon: GitBranch,
      color: 'text-orange-400 border-orange-500/30 bg-orange-950/30',
      badge: isRepoLive ? 'LIVE SYNC' : 'ACTIVE'
    },
    {
      id: 'stat-technologies',
      label: 'Core Technologies',
      value: `${technologiesCount}`,
      suffix: '+',
      description: 'Microcontrollers, languages, and protocols',
      icon: Wrench,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30'
    },
    {
      id: 'stat-experiments',
      label: 'Prototypes & Experiments',
      value: `${experimentsCount}`,
      suffix: '',
      description: 'Circuit breadboards, sensors & benchmarks',
      icon: FlaskConical,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/30'
    }
  ];

  return (
    <div id="stats-section" className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              id={stat.id}
              className="p-4 sm:p-5 rounded-xl bg-[#0d131f]/90 border border-slate-800/90 shadow-lg shadow-black/40 backdrop-blur-md hover:border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {stat.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-950/60 text-orange-400 border border-orange-800/50">
                    {stat.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {stat.value}
                </span>
                <span className="text-lg font-bold text-cyan-400 font-mono">
                  {stat.suffix}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>

              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
