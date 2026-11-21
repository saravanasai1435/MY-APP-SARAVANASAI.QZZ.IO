export type ProjectStatus = 'Completed' | 'Prototype' | 'In Progress' | 'Experimental';

export type ProjectCategory = 'all' | 'microcontrollers' | 'iot' | 'ai' | 'automation' | 'robotics';

export interface HardwareSpec {
  mcu: string;
  sensors?: string[];
  actuators?: string[];
  display?: string;
  communication?: string[];
  powerSupply?: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'microcontrollers' | 'iot' | 'ai' | 'automation' | 'robotics';
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  status: ProjectStatus;
  githubUrl: string;
  demoUrl?: string;
  youtubeId?: string;
  featured?: boolean;
  hardware: HardwareSpec;
  pinoutSummary?: string[];
  circuitHighlights?: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  homepage?: string | null;
  archived?: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface SkillItem {
  name: string;
  levelTag: string; // e.g., "Daily Use", "Advanced Prototyping", "Interfacing"
  description: string;
  protocols?: string[]; // e.g. ["I2C", "SPI", "UART"]
  badgeColor?: string;
}

export interface SkillGroup {
  category: 'Hardware' | 'Software' | 'Technology';
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface TechItem {
  name: string;
  category: 'Hardware' | 'Language' | 'Protocol & Tool' | 'AI & Cloud';
  description: string;
  tag: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  phase: string;
  description: string;
  status: 'Completed' | 'Current Focus' | 'Next Target';
  tags: string[];
}
