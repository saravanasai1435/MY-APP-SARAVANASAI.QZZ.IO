import React from 'react';
import { 
  Cpu, 
  Terminal, 
  Globe, 
  GitBranch, 
  Sparkles, 
  Database, 
  Radio, 
  Code2, 
  Layers 
} from 'lucide-react';
import { TECH_STACK } from '../data/skills';

export const TechStack: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Arduino':
      case 'ESP32 / S3':
      case 'Raspberry Pi':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Python':
        return <Terminal className="w-4 h-4 text-yellow-400" />;
      case 'JavaScript':
      case 'HTML & CSS':
        return <Globe className="w-4 h-4 text-amber-400" />;
      case 'GitHub':
        return <GitBranch className="w-4 h-4 text-purple-400" />;
      case 'AI APIs':
        return <Sparkles className="w-4 h-4 text-teal-400" />;
      case 'Firebase':
        return <Database className="w-4 h-4 text-orange-400" />;
      case 'REST APIs':
        return <Radio className="w-4 h-4 text-sky-400" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="tech-stack" className="py-16 relative border-t border-slate-800/80 bg-[#070b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col items-start mb-8">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            ENGINEERING TOOLKIT &amp; ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Technologies &amp; Platforms I Build With
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
            Carefully selected microcontrollers, programming environments, cloud telemetry bridges, and development toolchains.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800/80 group-hover:scale-110 transition-transform">
                  {getIcon(tech.name)}
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase">
                  {tech.category}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-slate-100 text-xs sm:text-sm group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 block mt-0.5 truncate">
                  {tech.tag}
                </span>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
