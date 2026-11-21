import React from 'react';
import { Cpu, Github, Youtube, ArrowUp, Activity } from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../services/github';
import { YOUTUBE_CONFIG } from '../data/youtube';
import { ThemeToggle } from './ThemeToggle';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#06090f] border-t border-slate-800/90 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand & Motto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight font-sans">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <span>Saravanasai</span>
            </div>
            <p className="text-slate-400 text-xs italic font-sans font-medium">
              "Building. Experimenting. Learning."
            </p>
            <span className="text-[11px] text-slate-500">
              Electronics • Embedded Systems • IoT • Practical Engineering
            </span>
          </div>

          {/* Social Links & Theme Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle idPrefix="footer" />

            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub</span>
            </a>

            <a
              href={YOUTUBE_CONFIG.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-red-950/40 border border-slate-800 hover:border-red-800/60 text-slate-300 hover:text-red-300 transition-colors"
            >
              <Youtube className="w-4 h-4 text-red-400" />
              <span>YouTube</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Hardware Telemetry & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FIRMWARE v2.4.0 • 240MHz XTAL • 3.3V REGULATED • ONLINE</span>
          </div>

          <div>
            <span>&copy; 2026 Saravanasai. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
