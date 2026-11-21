import React from 'react';
import { 
  Sparkles, 
  Github, 
  ExternalLink, 
  Youtube, 
  ArrowRight, 
  Cpu, 
  CircuitBoard,
  Layers
} from 'lucide-react';
import { Project } from '../types';
import { YOUTUBE_CONFIG } from '../data/youtube';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, onSelectProject }) => {
  const featured = projects.filter((p) => p.featured);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'Prototype':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'In Progress':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60';
      case 'Experimental':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
    }
  };

  return (
    <section id="featured" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-950/60 border border-orange-800/60 text-orange-400 font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP ENGINEERING BUILDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Hardware Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-1.5">
              Highlighting real-world electronic systems, custom firmware, and physical hardware prototypes built in the lab.
            </p>
          </div>

          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 self-start sm:self-auto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>View All ({projects.length}) Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Featured Projects Grid */}
        <div className="space-y-10">
          {featured.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={project.id}
                id={`featured-${project.id}`}
                className="group relative rounded-2xl bg-gradient-to-b from-[#0e1422] to-[#090d16] border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-8 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-950/30 overflow-hidden"
              >
                {/* Ambient background glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Image / Preview */}
                  <div className={`lg:col-span-6 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-lg ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

                      {/* Status pill overlay */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase border backdrop-blur-md ${getStatusBadge(project.status)}`}>
                          ● {project.status}
                        </span>
                      </div>

                      {/* Hardware chip tag */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                        <span className="flex items-center gap-1.5 text-cyan-300 font-semibold truncate">
                          <Cpu className="w-3.5 h-3.5" />
                          {project.hardware.mcu}
                        </span>
                        <span className="text-slate-400 uppercase text-[10px] hidden sm:inline">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`lg:col-span-6 flex flex-col justify-between ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                        <span>PROJECT 0{index + 1}</span>
                        <span>•</span>
                        <span className="uppercase">{project.category}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 group-hover:text-cyan-200 transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                        {project.shortDescription}
                      </p>

                      {/* Hardware Breakdown Summary */}
                      <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5 mb-5 font-mono text-xs text-slate-300 space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                          <CircuitBoard className="w-3.5 h-3.5 text-cyan-400" />
                          <span>CORE ARCHITECTURE &amp; HARDWARE STACK:</span>
                        </div>
                        <div className="text-slate-200 font-medium pl-5 text-[11px]">
                          {project.hardware.display && <span>Display: {project.hardware.display} • </span>}
                          {project.hardware.sensors && <span>Sensors: {project.hardware.sensors.join(', ')} • </span>}
                          {project.hardware.communication && <span>Bus: {project.hardware.communication.join(', ')}</span>}
                        </div>
                      </div>

                      {/* Technology Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => onSelectProject(project)}
                        id={`btn-inspect-${project.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-semibold text-xs font-mono shadow-md shadow-cyan-950 transition-all cursor-pointer"
                      >
                        <span>Components &amp; Wiring</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 text-cyan-400" />
                        <span>GitHub Files &amp; Code</span>
                      </a>

                      <a
                        href={YOUTUBE_CONFIG.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-red-950/40 border border-slate-700 hover:border-red-800 text-slate-200 hover:text-red-300 text-xs font-mono transition-colors"
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-400" />
                        <span>Demo Video</span>
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
