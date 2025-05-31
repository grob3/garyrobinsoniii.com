export interface AboutData {
  heroTitle: string;
  heroSubtitle: string;
  image: string;
  paragraphs: string[];
}

export interface ResumeItem {
  id: string;
  category: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  details: string[];
  icon: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  detailLink: string;
}

export interface PortfolioData {
  projects: Project[];
}

export interface ContactInfo {
  email: string;
  location: string;
  website: string;
  socialLinks: {
    platform: string;
    icon: string;
    url: string;
  }[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
