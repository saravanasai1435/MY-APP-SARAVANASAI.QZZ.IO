import React from 'react';
import { 
  ArrowRight, 
  Github, 
  Youtube, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  ChevronDown 
} from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../services/github';
import { YOUTUBE_CONFIG } from '../data/youtube';
import { AIAssistant } from './AIAssistant';
import { ThemeToggle } from './ThemeToggle';

export const Hero: React.FC = () => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Background Circuit Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle Gradient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Calls to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status pill badge & Theme Switcher */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>ACTIVE HARDWARE LAB • PRACTICAL ENGINEERING</span>
              </div>
              <ThemeToggle idPrefix="hero" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200">Saravanasai</span>.
            </h1>

            {/* Sub-headline */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-5 flex flex-wrap items-center gap-2">
              <span>Student</span>
              <span className="text-cyan-400 font-bold">•</span>
              <span>Builder</span>
              <span className="text-orange-400 font-bold">•</span>
              <span className="text-slate-300">Electronics &amp; Technology Enthusiast</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
              I build practical projects combining electronics, embedded systems, software, AI and automation. 
              Focused on turning real circuit schematics and microcontrollers into functioning, real-world systems rather than only studying theory.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                id="hero-btn-view-projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-950/60 transition-all font-mono group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-btn-github"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-medium text-sm transition-all shadow-md font-mono"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-btn-youtube"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-red-950/30 border border-slate-700/80 hover:border-red-600/50 text-slate-200 hover:text-red-300 font-medium text-sm transition-all shadow-md font-mono"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube</span>
              </a>
            </div>

            {/* Quick stats ribbon below buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>ESP32 / Arduino / Pico</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-400" />
                <span>IoT &amp; Automation Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>C++ / Python / TypeScript</span>
              </div>
            </div>

          </div>

          {/* Right Column: AI Assistant for Visitors & Project Guidance */}
          <div className="lg:col-span-5 w-full">
            <AIAssistant embedded />
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex justify-center mt-12">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">Explore System</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
