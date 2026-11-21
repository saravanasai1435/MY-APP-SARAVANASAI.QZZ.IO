import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Cpu, 
  Filter, 
  Layers, 
  SlidersHorizontal,
  X 
} from 'lucide-react';
import { Project, ProjectCategory, ProjectStatus } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'microcontrollers', label: 'Microcontrollers' },
    { id: 'iot', label: 'IoT & Telemetry' },
    { id: 'robotics', label: 'Robotics & Actuators' },
    { id: 'ai', label: 'AI & Edge Vision' },
    { id: 'automation', label: 'Automation & Security' },
  ];

  const statuses: { id: string; label: string }[] = [
    { id: 'all', label: 'All Statuses' },
    { id: 'Completed', label: 'Completed' },
    { id: 'Prototype', label: 'Prototypes' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Experimental', label: 'Experimental' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && project.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = project.name.toLowerCase().includes(query);
        const matchesDesc = project.shortDescription.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesMcu = project.hardware.mcu.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesTech || matchesMcu;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  return (
    <section id="projects" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>HARDWARE &amp; EMBEDDED DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Electronics &amp; Technology Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1.5">
            Complete collection of physical computing circuits, microcontroller boards, automation mechanisms, and AI prototypes.
          </p>
        </div>

        {/* Filter and Search Controls Bar */}
        <div className="bg-[#0c111c] border border-slate-800/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl space-y-4">
          
          {/* Top row: Search input + Status dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, sensor, MCU (e.g. ESP32, RFID, Ultrasonic)..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto py-1">
              <span className="text-slate-500 text-xs font-mono hidden md:inline px-1">STATUS:</span>
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    selectedStatus === status.id
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm shadow-cyan-950'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <span>SHOWING {filteredProjects.length} OF {projects.length} PROJECTS</span>
          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="text-cyan-400 hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8">
            <Cpu className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-300">No matching projects found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Try adjusting your search query or removing status and category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono hover:bg-cyan-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
