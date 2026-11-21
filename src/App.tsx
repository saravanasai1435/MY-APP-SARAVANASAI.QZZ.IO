import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ArchivedProjects } from './components/ArchivedProjects';
import { YouTubeSection } from './components/YouTubeSection';
import { Skills } from './components/Skills';
import { TechStack } from './components/TechStack';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AIAssistant } from './components/AIAssistant';
import { Bot, Sparkles } from 'lucide-react';

import { PROJECTS } from './data/projects';
import { fetchUserRepos, FALLBACK_REPOSITORIES } from './services/github';
import { Project, GitHubRepo } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState<boolean>(false);

  // GitHub State
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOSITORIES);
  const [isRepoLoading, setIsRepoLoading] = useState<boolean>(true);
  const [isRepoLive, setIsRepoLive] = useState<boolean>(false);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [repoError, setRepoError] = useState<string | undefined>();

  // Fetch GitHub repos on mount
  const loadGitHubRepos = async () => {
    setIsRepoLoading(true);
    try {
      const result = await fetchUserRepos();
      setRepos(result.repos);
      setIsRepoLive(result.isLive);
      setIsRateLimited(Boolean(result.rateLimited));
      setRepoError(result.error);
    } catch {
      setRepos(FALLBACK_REPOSITORIES);
      setIsRepoLive(false);
    } finally {
      setIsRepoLoading(false);
    }
  };

  useEffect(() => {
    loadGitHubRepos();
  }, []);

  // Intersection observer to track active section for navbar
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'featured',
      'projects',
      'archived',
      'youtube',
      'skills',
      'timeline',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-200">
          {/* Sticky Navigation Bar */}
          <Navbar activeSection={activeSection} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section with Live Microcontroller Hardware Telemetry Panel */}
          <Hero />

          {/* 2. Dynamic Real Statistics Bar */}
          <Stats repoCount={repos.length} isRepoLive={isRepoLive} />

          {/* 3. About Me Section */}
          <About />

          {/* 4. Flagship Featured Projects */}
          <FeaturedProjects 
            projects={PROJECTS} 
            onSelectProject={(proj) => setSelectedProject(proj)} 
          />

          {/* 5. Complete Projects Grid with Filter & Pinout Inspector */}
          <ProjectsGrid 
            projects={PROJECTS} 
            onSelectProject={(proj) => setSelectedProject(proj)} 
          />

          {/* 6. Archived Historical Projects & Research Builds */}
          <ArchivedProjects 
            onSelectProject={(proj) => setSelectedProject(proj)} 
          />

          {/* 7. YouTube Channel: Electrotech with Saravanasai */}
          <YouTubeSection />

          {/* 8. Technical Skills Grouped by Hardware, Software, Technology */}
          <Skills />

          {/* 9. Technology Stack Grid */}
          <TechStack />

          {/* 10. Engineering Timeline Progression */}
          <Timeline />

          {/* 11. Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating AI Assistant Trigger */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsAssistantModalOpen(true)}
            id="floating-ai-assistant-btn"
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold text-xs font-mono shadow-2xl shadow-cyan-950/70 border border-cyan-300/40 transition-all hover:scale-105 cursor-pointer group"
            title="Ask Saravanasai AI Assistant"
            aria-label="Open AI Assistant"
          >
            <div className="relative">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="hidden sm:inline">Ask AI Assistant</span>
            <span className="inline sm:hidden">AI Guide</span>
          </button>
        </div>

        {/* Floating AI Assistant Modal */}
        {isAssistantModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsAssistantModalOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
              <AIAssistant onClose={() => setIsAssistantModalOpen(false)} />
            </div>
          </div>
        )}

          {/* Interactive Project Schematic & Pinout Inspector Modal */}
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
