export type Language = 'en' | 'pl';

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
  
  // Work Experience - M8B
  m8bPosition: string;
  m8bPeriod: string;
  m8bLocation: string;
  m8bTask1: string;
  m8bTask2: string;
  m8bTask3: string;
  m8bTask4: string;
  m8bTask5: string;
  m8bTask6: string;
  
  // Work Experience - Van Gelder
  vanGelderPosition: string;
  vanGelderPeriod: string;
  vanGelderLocation: string;
  vanGelderTask1: string;
  vanGelderTask2: string;
  vanGelderTask3: string;
  vanGelderTask4: string;
  vanGelderTask5: string;
  vanGelderTask6: string;
  
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
    
    // Work Experience - M8B
    m8bPosition: 'Senior Software Engineer',
    m8bPeriod: 'January 2023 - Present',
    m8bLocation: 'San Francisco, CA',
    m8bTask1: 'Developing scalable web applications using React and TypeScript',
    m8bTask2: 'Leading code reviews and mentoring junior developers',
    m8bTask3: 'Architecting microservices with Node.js and Express',
    m8bTask4: 'Implementing CI/CD pipelines and automated testing strategies',
    m8bTask5: 'Optimizing application performance and user experience',
    m8bTask6: 'Collaborating with product teams to define technical requirements',
    
    // Work Experience - Van Gelder
    vanGelderPosition: 'Full Stack Developer',
    vanGelderPeriod: '2020 - 2022',
    vanGelderLocation: 'New York, NY',
    vanGelderTask1: 'Built responsive web applications using modern JavaScript frameworks',
    vanGelderTask2: 'Designed and implemented RESTful APIs with Node.js',
    vanGelderTask3: 'Managed database operations with PostgreSQL and MongoDB',
    vanGelderTask4: 'Collaborated with UX/UI designers to implement pixel-perfect designs',
    vanGelderTask5: 'Participated in agile development processes and sprint planning',
    vanGelderTask6: 'Maintained and improved existing codebase with 95% test coverage',
    
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
    
    // Work Experience - M8B
    m8bPosition: 'Starszy Inżynier Oprogramowania',
    m8bPeriod: 'Styczeń 2023 - Obecnie',
    m8bLocation: 'San Francisco, CA',
    m8bTask1: 'Tworzenie skalowalnych aplikacji webowych przy użyciu React i TypeScript',
    m8bTask2: 'Prowadzenie przeglądów kodu i mentoring młodszych programistów',
    m8bTask3: 'Projektowanie mikrousług z Node.js i Express',
    m8bTask4: 'Implementacja pipeline CI/CD i strategii automatycznych testów',
    m8bTask5: 'Optymalizacja wydajności aplikacji i doświadczenia użytkownika',
    m8bTask6: 'Współpraca z zespołami produktowymi w definiowaniu wymagań technicznych',
    
    // Work Experience - Van Gelder
    vanGelderPosition: 'Full Stack Developer',
    vanGelderPeriod: '2020 - 2022',
    vanGelderLocation: 'New York, NY',
    vanGelderTask1: 'Budowanie responsywnych aplikacji webowych przy użyciu nowoczesnych frameworków JavaScript',
    vanGelderTask2: 'Projektowanie i implementacja RESTful API z Node.js',
    vanGelderTask3: 'Zarządzanie operacjami bazodanowymi z PostgreSQL i MongoDB',
    vanGelderTask4: 'Współpraca z projektantami UX/UI w implementacji pixel-perfect designów',
    vanGelderTask5: 'Uczestnictwo w procesach agile development i planowaniu sprintów',
    vanGelderTask6: 'Utrzymanie i ulepszanie istniejącej bazy kodu z 95% pokryciem testami',
    
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