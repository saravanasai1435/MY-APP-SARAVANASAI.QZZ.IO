import React, { useEffect } from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Cpu, 
  Layers, 
  CircuitBoard, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Activity,
  Youtube
} from 'lucide-react';
import { Project } from '../types';
import { YOUTUBE_CONFIG } from '../data/youtube';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl my-8 bg-[#0b0f19] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with Gradient Overlay */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img 
            src={project.image} 
            alt={project.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Status badge in header */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2.5">
            <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border uppercase ${getStatusBadge(project.status)}`}>
              STATUS: {project.status}
            </span>
            <span className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
              {project.fullDescription}
            </p>
          </div>

          {/* Hardware & Components Bill of Materials Breakdown */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-4 sm:p-5 font-mono text-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h4 className="text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-2">
                <CircuitBoard className="w-4 h-4" />
                COMPONENTS &amp; HARDWARE BILL OF MATERIALS (BOM)
              </h4>
              <span className="text-[10px] text-slate-500 uppercase">Hardware Manifest</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                <span className="text-cyan-400 block text-[11px] font-semibold">1. CONTROLLER CORE:</span>
                <span className="font-semibold text-slate-100">{project.hardware.mcu}</span>
              </div>
              {project.hardware.display && (
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 block text-[11px] font-semibold">2. DISPLAY MODULE:</span>
                  <span className="font-semibold text-slate-100">{project.hardware.display}</span>
                </div>
              )}
              {project.hardware.sensors && project.hardware.sensors.length > 0 && (
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 block text-[11px] font-semibold">3. SENSORS NEEDED:</span>
                  <span className="font-semibold text-slate-100">{project.hardware.sensors.join(', ')}</span>
                </div>
              )}
              {project.hardware.actuators && project.hardware.actuators.length > 0 && (
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 block text-[11px] font-semibold">4. ACTUATORS &amp; OUTPUTS:</span>
                  <span className="font-semibold text-slate-100">{project.hardware.actuators.join(', ')}</span>
                </div>
              )}
              {project.hardware.communication && (
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 block text-[11px] font-semibold">5. BUSES &amp; INTERFACES:</span>
                  <span className="font-semibold text-slate-100">{project.hardware.communication.join(', ')}</span>
                </div>
              )}
              {project.hardware.powerSupply && (
                <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 block text-[11px] font-semibold">6. POWER SUPPLY:</span>
                  <span className="font-semibold text-slate-100">{project.hardware.powerSupply}</span>
                </div>
              )}
            </div>

            {/* GitHub Files Needed indicator */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>Firmware Files: <strong className="text-slate-200">main.cpp / .ino, schematics &amp; platformio.ini</strong></span>
              </span>
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
              >
                Browse Files &rarr;
              </a>
            </div>
          </div>

          {/* Pinout & GPIO Table */}
          {project.pinoutSummary && project.pinoutSummary.length > 0 && (
            <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-4 sm:p-5 font-mono text-xs">
              <h4 className="text-orange-400 font-bold tracking-wider uppercase mb-2.5 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                PINOUT &amp; GPIO WIRING SUMMARY
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {project.pinoutSummary.map((pin, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded border border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{pin}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Circuit Highlights */}
          {project.circuitHighlights && project.circuitHighlights.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                ENGINEERING HIGHLIGHTS &amp; CIRCUIT DESIGN
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.circuitHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              TECHNOLOGIES &amp; LIBRARIES
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-700 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-medium border border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>View on GitHub</span>
              </a>

              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-200 text-xs font-mono font-medium border border-red-800/60 transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>Watch on YouTube</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
