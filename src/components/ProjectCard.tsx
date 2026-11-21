import React from 'react';
import { 
  Github, 
  ExternalLink, 
  Cpu, 
  Info, 
  Youtube,
  Radio
} from 'lucide-react';
import { Project } from '../types';
import { YOUTUBE_CONFIG } from '../data/youtube';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-700/50';
      case 'Prototype':
        return 'bg-amber-950/70 text-amber-300 border-amber-700/50';
      case 'In Progress':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-700/50';
      case 'Experimental':
        return 'bg-purple-950/70 text-purple-300 border-purple-700/50';
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="group flex flex-col rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-cyan-500/40 shadow-lg hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
        onClick={() => onSelect(project)}
      >
        <img
          src={project.image}
          alt={project.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-transparent to-transparent opacity-80" />

        {/* Status Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border backdrop-blur-md ${getStatusBadge(project.status)}`}>
            ● {project.status}
          </span>
        </div>

        {/* Microcontroller core tag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
          <span className="flex items-center gap-1 text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="truncate max-w-[170px]">{project.hardware.mcu.split('(')[0]}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 uppercase">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelect(project)}
            className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1 mb-2"
          >
            {project.name}
          </h3>

          <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-3">
            {project.shortDescription}
          </p>

          {/* Explicit Components & Hardware Needed Box */}
          <div className="mb-3.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-400 mb-1.5 pb-1 border-b border-slate-800/60">
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                COMPONENTS NEEDED:
              </span>
              <span className="text-[10px] text-slate-500">BOM SPEC</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                <span className="text-slate-400 font-semibold shrink-0">MCU:</span>
                <span className="truncate">{project.hardware.mcu.split('(')[0]}</span>
              </div>
              {project.hardware.sensors && project.hardware.sensors.length > 0 && (
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                  <span className="text-slate-400 font-semibold shrink-0">Sensors:</span>
                  <span className="truncate">{project.hardware.sensors[0]}</span>
                </div>
              )}
              {project.hardware.display && (
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-slate-400 font-semibold shrink-0">Display:</span>
                  <span className="truncate">{project.hardware.display}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Components &amp; Wiring</span>
          </button>

          <div className="flex items-center gap-1.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors text-[11px] font-mono"
              title="View GitHub Files & Source"
              aria-label="View GitHub Files"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>Files</span>
            </a>

            <a
              href={YOUTUBE_CONFIG.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900 text-slate-300 hover:text-red-400 transition-colors"
              title="Video Demo"
              aria-label="Video Demo"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
