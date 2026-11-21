import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Layers, 
  CircuitBoard, 
  Terminal, 
  Radio, 
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { SKILL_GROUPS } from '../data/skills';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hardware' | 'Software' | 'Technology'>('All');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hardware':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Software':
        return <Code2 className="w-4 h-4 text-orange-400" />;
      case 'Technology':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      default:
        return <CircuitBoard className="w-4 h-4 text-cyan-400" />;
    }
  };

  const displayedGroups = activeCategory === 'All' 
    ? SKILL_GROUPS 
    : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs mb-3">
              <CircuitBoard className="w-3.5 h-3.5" />
              <span>PRACTICAL ENGINEERING COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Skills &amp; Capabilities
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-1.5">
              Disciplined hands-on engineering proficiencies across physical microcontrollers, low-level firmware, vision systems, and protocols.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1 self-start sm:self-auto font-mono text-xs">
            {(['All', 'Hardware', 'Software', 'Technology'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Stack */}
        <div className="space-y-12">
          {displayedGroups.map((group) => (
            <div key={group.category} className="space-y-4">
              
              {/* Group Title Bar */}
              <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {getCategoryIcon(group.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {group.category} Architecture
                  </h3>
                  <p className="text-xs text-slate-400">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Skills Grid - Compact visual cards, no fake percentage bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-[#0d131f] border border-slate-800 hover:border-cyan-500/30 hover:bg-[#101726] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top: Name + Level Tag */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border whitespace-nowrap ${skill.badgeColor || 'text-slate-300 bg-slate-900 border-slate-800'}`}>
                          {skill.levelTag}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {skill.description}
                      </p>
                    </div>

                    {/* Protocol Badges */}
                    {skill.protocols && skill.protocols.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/80">
                        {skill.protocols.map((proto) => (
                          <span
                            key={proto}
                            className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            {proto}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
