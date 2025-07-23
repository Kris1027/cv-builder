import { Language, Translations } from '../types';

export const translations: Record<Language, Translations> = {
  en: {
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    
    // Navigation/Sections
    workExperience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    interests: 'Interests',
    
    // Work Experience - Latest Job
    latestJobPosition: 'Senior Software Engineer',
    latestJobPeriod: 'January 2023 - Present',
    latestJobLocation: 'San Francisco, CA',
    latestJobTask1: 'Developing scalable web applications using React and TypeScript',
    latestJobTask2: 'Leading code reviews and mentoring junior developers',
    latestJobTask3: 'Architecting microservices with Node.js and Express',
    latestJobTask4: 'Implementing CI/CD pipelines and automated testing strategies',
    latestJobTask5: 'Optimizing application performance and user experience',
    latestJobTask6: 'Collaborating with product teams to define technical requirements',
    
    // Work Experience - Previous Job
    previousJobPosition: 'Full Stack Developer',
    previousJobPeriod: '2020 - 2022',
    previousJobLocation: 'New York, NY',
    previousJobTask1: 'Built responsive web applications using modern JavaScript frameworks',
    previousJobTask2: 'Designed and implemented RESTful APIs with Node.js',
    previousJobTask3: 'Managed database operations with PostgreSQL and MongoDB',
    previousJobTask4: 'Collaborated with UX/UI designers to implement pixel-perfect designs',
    previousJobTask5: 'Participated in agile development processes and sprint planning',
    previousJobTask6: 'Maintained and improved existing codebase with 95% test coverage',
    
    // Education
    educationProfile: 'Computer Science',
    educationPeriod: '2016 - 2020',
    educationLocation: 'Stanford University, CA',
    
    // Languages
    polish: 'Polish',
    english: 'English',
    native: 'Native',
    c1: 'C1',
    
    // Interests
    football: 'Photography',
    videoGames: 'Reading',
    technology: 'Technology',
    pcBuilding: 'Cooking',
    running: 'Running',
    natureTrekking: 'Hiking',
  },
  
  pl: {
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    
    // Navigation/Sections
    workExperience: 'Doświadczenie Zawodowe',
    education: 'Wykształcenie',
    skills: 'Umiejętności',
    languages: 'Języki',
    interests: 'Zainteresowania',
    
    // Work Experience - Latest Job
    latestJobPosition: 'Starszy Inżynier Oprogramowania',
    latestJobPeriod: 'Styczeń 2023 - Obecnie',
    latestJobLocation: 'San Francisco, CA',
    latestJobTask1: 'Tworzenie skalowalnych aplikacji webowych przy użyciu React i TypeScript',
    latestJobTask2: 'Prowadzenie przeglądów kodu i mentoring młodszych programistów',
    latestJobTask3: 'Projektowanie mikrousług z Node.js i Express',
    latestJobTask4: 'Implementacja pipeline CI/CD i strategii automatycznych testów',
    latestJobTask5: 'Optymalizacja wydajności aplikacji i doświadczenia użytkownika',
    latestJobTask6: 'Współpraca z zespołami produktowymi w definiowaniu wymagań technicznych',
    
    // Work Experience - Previous Job
    previousJobPosition: 'Full Stack Developer',
    previousJobPeriod: '2020 - 2022',
    previousJobLocation: 'New York, NY',
    previousJobTask1: 'Budowanie responsywnych aplikacji webowych przy użyciu nowoczesnych frameworków JavaScript',
    previousJobTask2: 'Projektowanie i implementacja RESTful API z Node.js',
    previousJobTask3: 'Zarządzanie operacjami bazodanowymi z PostgreSQL i MongoDB',
    previousJobTask4: 'Współpraca z projektantami UX/UI w implementacji pixel-perfect designów',
    previousJobTask5: 'Uczestnictwo w procesach agile development i planowaniu sprintów',
    previousJobTask6: 'Utrzymanie i ulepszanie istniejącej bazy kodu z 95% pokryciem testami',
    
    // Education
    educationProfile: 'Informatyka',
    educationPeriod: '2016 - 2020',
    educationLocation: 'Stanford University, CA',
    
    // Languages
    polish: 'Polski',
    english: 'Angielski',
    native: 'Ojczysty',
    c1: 'C1',
    
    // Interests
    football: 'Fotografia',
    videoGames: 'Czytanie',
    technology: 'Technologia',
    pcBuilding: 'Gotowanie',
    running: 'Bieganie',
    natureTrekking: 'Wędrówki',
  },
};

export const defaultLanguage: Language = 'en';