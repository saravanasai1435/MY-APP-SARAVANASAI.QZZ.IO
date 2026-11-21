import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Github, 
  Youtube, 
  Menu, 
  X, 
  ExternalLink,
  Code2, 
  Layers, 
  Send
} from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../services/github';
import { YOUTUBE_CONFIG } from '../data/youtube';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Featured', href: '#featured' },
    { name: 'Projects', href: '#projects' },
    { name: 'Archived', href: '#archived' },
    { name: 'YouTube', href: '#youtube' },
    { name: 'Skills', href: '#skills' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group"
          id="navbar-brand-logo"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center relative group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-950">
            <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse ring-2 ring-[#090d14]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-100 flex items-center gap-1.5">
              Saravanasai
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 hidden sm:inline-block">
                DEV/HW
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono tracking-wider">
              ELECTRONICS &amp; EMBEDDED
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-sm" id="desktop-navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                id={`nav-link-${link.name.toLowerCase()}`}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-700/50 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Socials */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Engineering Theme Mode Switcher */}
          <ThemeToggle idPrefix="navbar-desktop" />

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github-link"
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Saravanasai on GitHub"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={YOUTUBE_CONFIG.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-youtube-link"
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-red-950/40 border border-slate-800 hover:border-red-800/60 text-slate-300 hover:text-red-400 transition-colors"
            title="Electrotech with Saravanasai on YouTube"
            aria-label="YouTube Channel"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            id="nav-contact-cta"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 shadow-md shadow-cyan-950 transition-all font-mono"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONNECT</span>
          </a>
        </div>

        {/* Mobile Action Controls: Compact Theme Toggle + Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle compact idPrefix="navbar-mobile-header" />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#0a0e17] border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl transition-all"
        >
          <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">ENGINEERING THEME</span>
            <ThemeToggle idPrefix="navbar-mobile-drawer" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                id={`mobile-nav-${link.name.toLowerCase()}`}
                className="px-3 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                GitHub
              </a>
              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
              >
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                YouTube
              </a>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 font-mono"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
