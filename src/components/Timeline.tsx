import React from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  Clock, 
  Compass, 
  ArrowRight, 
  Cpu, 
  CircuitBoard,
  Sparkles
} from 'lucide-react';
import { TIMELINE_ENTRIES } from '../data/timeline';

export const Timeline: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'Current Focus':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60 animate-pulse';
      case 'Next Target':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'Current Focus':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Next Target':
        return <Compass className="w-4 h-4 text-purple-400" />;
      default:
        return <Milestone className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="timeline" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-purple-400 font-mono text-xs mb-3">
            <Milestone className="w-3.5 h-3.5" />
            <span>ENGINEERING PROGRESSION &amp; ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Builder's Journey
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1.5">
            How hands-on exploration evolved from basic discrete analog circuits to dual-core microcontrollers, edge artificial intelligence, and autonomous systems.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-8 pb-4">
          {TIMELINE_ENTRIES.map((entry, index) => (
            <div 
              key={entry.title}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Node Bullet */}
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-cyan-400 flex items-center justify-center transition-colors shadow-md">
                {getStatusIcon(entry.status)}
              </div>

              {/* Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg">
                
                {/* Meta Top */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-cyan-400 font-bold">{entry.year}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-300 font-medium uppercase tracking-wider">{entry.phase}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono border font-semibold uppercase ${getStatusBadge(entry.status)}`}>
                    {entry.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                  {entry.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {entry.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Note about maintaining entries */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-slate-500">
            * Milestone roadmap entries are centrally maintained in <code className="text-cyan-400">src/data/timeline.ts</code> for future engineering logs.
          </p>
        </div>

      </div>
    </section>
  );
};
