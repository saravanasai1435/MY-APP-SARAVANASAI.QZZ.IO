import React, { useState, useMemo } from 'react';
import { 
  Archive, 
  Cpu, 
  ExternalLink, 
  Layers, 
  Eye, 
  Search, 
  Code2, 
  SlidersHorizontal,
  FolderArchive
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { ARCHIVED_PROJECTS } from '../data/archivedProjects';

interface ArchivedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const ArchivedProjects: React.FC<ArchivedProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Archived' },
    { id: 'ai', label: 'AI & Speech' },
    { id: 'microcontrollers', label: 'Microcontrollers & Tools' },
    { id: 'robotics', label: 'Robotics & Control' },
    { id: 'iot', label: 'IoT & Telemetry' },
  ];

  const filteredProjects = useMemo(() => {
    return ARCHIVED_PROJECTS.filter((project) => {
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesDesc = project.shortDescription.toLowerCase().includes(query);
        const matchesTech = project.technologies.some(t => t.toLowerCase().includes(query));
        const matchesMcu = project.hardware.mcu.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesTech || matchesMcu;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="archived" className="py-20 relative bg-[#070b12] border-t border-slate-800/80">
      {/* Background subtle ambient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/40 border border-amber-800/50 text-amber-300 font-mono text-xs mb-3">
              <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
              <span>ARCHIVED RESEARCH &amp; REPOSITORIES • PREVIOUS BUILDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Archived Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Historical prototypes, hardware tools, and specialized embedded codebases from earlier engineering milestones — each documented with AI-generated bench thumbnails, component specifications, and direct GitHub repositories.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-xs flex items-center gap-2">
              <Archive className="w-4 h-4 text-amber-400" />
              <span className="text-white font-bold">{ARCHIVED_PROJECTS.length}</span> Archived Builds
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-[#0b101b] p-3 rounded-2xl border border-slate-800/80">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archived..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Archived Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#0c111c] rounded-2xl border border-slate-800/80 p-8">
            <Archive className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No archived projects found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filter or search keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl bg-[#0c121e] border border-slate-800 hover:border-amber-500/40 shadow-lg hover:shadow-xl hover:shadow-amber-950/20 transition-all duration-300 overflow-hidden"
              >
                {/* AI Thumbnail Container */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border bg-amber-950/80 text-amber-300 border-amber-700/60 backdrop-blur-md">
                      ARCHIVED
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-slate-950/80 text-slate-300 border border-slate-800 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* MCU Footprint Tag */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span className="flex items-center gap-1.5 text-amber-300 bg-slate-950/90 backdrop-blur-md px-2.5 py-0.5 rounded border border-slate-800 truncate max-w-[200px]">
                      <Cpu className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{project.hardware.mcu.split('(')[0]}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      AI Thumbnail
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {project.name}
                  </h3>

                  <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/40 text-xs font-mono text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect BOM</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Open GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
