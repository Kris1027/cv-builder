// Centralized type definitions
export type Language = 'en' | 'pl';

export type ViewMode = 'menu' | 'form' | 'example' | 'userCV';

export interface CVData {
  // Personal Information
  firstName: string;
  lastName: string;
  
  // Contact Information
  website: string;
  websiteUrl: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  
  // Work Experience
  jobs: Array<{
    company: string;
    position: string;
    period: string;
    location: string;
    tasks: string[];
  }>;
  
  // Education
  education: {
    profile: string;
    period: string;
    location: string;
  };
  
  // Skills
  skills: string[];
  
  // Languages
  languages: Array<{
    name: string;
    level: string;
  }>;
  
  // Interests
  interests: string[];
}

export interface Translations {
  // Personal Information
  firstName: string;
  lastName: string;
  
  // Navigation/Sections
  workExperience: string;
  education: string;
  skills: string;
  languages: string;
  interests: string;
  
  // Work Experience - Current Job
  currentJobPosition: string;
  currentJobPeriod: string;
  currentJobLocation: string;
  currentJobTask1: string;
  currentJobTask2: string;
  currentJobTask3: string;
  currentJobTask4: string;
  currentJobTask5: string;
  currentJobTask6: string;
  
  // Work Experience - Previous Job
  previousJobPosition: string;
  previousJobPeriod: string;
  previousJobLocation: string;
  previousJobTask1: string;
  previousJobTask2: string;
  previousJobTask3: string;
  previousJobTask4: string;
  previousJobTask5: string;
  previousJobTask6: string;
  
  // Education
  educationProfile: string;
  educationPeriod: string;
  educationLocation: string;
  
  // Languages
  polish: string;
  english: string;
  native: string;
  c1: string;
  
  // Interests
  football: string;
  videoGames: string;
  technology: string;
  pcBuilding: string;
  running: string;
  natureTrekking: string;
}