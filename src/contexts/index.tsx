import { createContext, useState, ReactNode, useContext } from 'react';
import { Language, CVData, ViewMode, Translations } from '../types';
import { translations, defaultLanguage } from '../data';

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: keyof Translations): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// CV Data Context
interface CVDataContextType {
  cvData: CVData;
  setCVData: (data: CVData) => void;
  updateCVData: (updates: Partial<CVData>) => void;
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  startNewCV: () => void;
  viewExample: () => void;
}

const exampleCVData: CVData = {
  firstName: 'John',
  lastName: 'Doe',
  website: 'johndoe.dev',
  websiteUrl: 'https://www.johndoe.dev/',
  github: 'johndoe',
  githubUrl: 'https://github.com/johndoe',
  linkedin: 'john-doe-dev',
  linkedinUrl: 'https://www.linkedin.com/in/john-doe-dev/',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  jobs: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      period: 'January 2023 - Present',
      location: 'San Francisco, CA',
      tasks: [
        'Developing scalable web applications using React and TypeScript',
        'Leading code reviews and mentoring junior developers',
        'Architecting microservices with Node.js and Express',
        'Implementing CI/CD pipelines and automated testing strategies',
        'Optimizing application performance and user experience',
        'Collaborating with product teams to define technical requirements'
      ]
    },
    {
      company: 'Digital Solutions Ltd.',
      position: 'Full Stack Developer',
      period: '2020 - 2022',
      location: 'New York, NY',
      tasks: [
        'Built responsive web applications using modern JavaScript frameworks',
        'Designed and implemented RESTful APIs with Node.js',
        'Managed database operations with PostgreSQL and MongoDB',
        'Collaborated with UX/UI designers to implement pixel-perfect designs',
        'Participated in agile development processes and sprint planning',
        'Maintained and improved existing codebase with 95% test coverage'
      ]
    }
  ],
  education: {
    profile: 'Computer Science',
    period: '2016 - 2020',
    location: 'Stanford University, CA'
  },
  skills: [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js',
    'Express.js', 'MongoDB', 'PostgreSQL', 'Python', 'Git', 'Docker',
    'AWS', 'REST APIs', 'GraphQL', 'Jest', 'Webpack', 'Linux'
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'C1' }
  ],
  interests: ['Photography', 'Reading', 'Technology', 'Cooking', 'Running', 'Hiking']
};

const blankCVData: CVData = {
  firstName: '',
  lastName: '',
  website: '',
  websiteUrl: '',
  github: '',
  githubUrl: '',
  linkedin: '',
  linkedinUrl: '',
  email: '',
  phone: '',
  jobs: [
    {
      company: '',
      position: '',
      period: '',
      location: '',
      tasks: ['']
    }
  ],
  education: {
    profile: '',
    period: '',
    location: ''
  },
  skills: [],
  languages: [
    { name: '', level: '' }
  ],
  interests: []
};

const CVDataContext = createContext<CVDataContextType | undefined>(undefined);

export function CVDataProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(blankCVData);
  const [currentView, setCurrentView] = useState<ViewMode>('menu');

  const updateCVData = (updates: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...updates }));
  };

  const startNewCV = () => {
    setCVData(blankCVData);
    setCurrentView('form');
  };

  const viewExample = () => {
    setCVData(exampleCVData);
    setCurrentView('example');
  };

  return (
    <CVDataContext.Provider value={{
      cvData,
      setCVData,
      updateCVData,
      currentView,
      setCurrentView,
      startNewCV,
      viewExample
    }}>
      {children}
    </CVDataContext.Provider>
  );
}

export function useCVData() {
  const context = useContext(CVDataContext);
  if (context === undefined) {
    throw new Error('useCVData must be used within a CVDataProvider');
  }
  return context;
}