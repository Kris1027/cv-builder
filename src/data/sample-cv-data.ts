import type { PersonalInfoProps, ExperienceProps, EducationProps, SkillProps, LanguageProps, InterestProps } from '@/types/form-types';

export interface CVData {
  personalInfo: PersonalInfoProps;
  experiences: ExperienceProps[];
  education: EducationProps[];
  skills: SkillProps[];
  languages: LanguageProps[];
  interests: InterestProps[];
}

export const sampleCVData: CVData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Anderson',
    location: 'San Francisco, CA',
    title: 'Senior Full Stack Developer',
    phone: '+1 415 555 0123',
    email: 'john.anderson@email.com',
    website: 'johnanderson.dev',
    linkedin: 'john-anderson-dev',
    github: 'janderson-dev',
  },
  experiences: [
    {
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Developer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: `• Leading development of microservices architecture using Node.js and React
• Implementing CI/CD pipelines and automated testing strategies
• Mentoring junior developers and conducting code reviews
• Optimizing application performance and reducing load times by 40%
• Collaborating with product team to define technical requirements
• Managing cloud infrastructure on AWS and implementing scalability solutions`,
    },
    {
      company: 'Digital Innovations Inc',
      position: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: `• Developed and maintained RESTful APIs using Express.js and PostgreSQL
• Built responsive web applications using React and TypeScript
• Implemented real-time features using WebSocket connections
• Integrated third-party services and payment gateways
• Participated in agile development processes and sprint planning
• Improved code quality through unit testing and documentation`,
    },
  ],
  education: [
    {
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      description: '',
    },
  ],
  skills: [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'Next.js' },
    { name: 'Express.js' },
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
    { name: 'Redis' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'AWS' },
    { name: 'GraphQL' },
    { name: 'REST APIs' },
    { name: 'Git' },
    { name: 'CI/CD' },
    { name: 'Tailwind CSS' },
    { name: 'Jest' },
  ],
  languages: [
    { language: 'English', proficiency: 'NATIVE' },
    { language: 'Spanish', proficiency: 'B2' },
    { language: 'German', proficiency: 'A2' },
  ],
  interests: [
    { name: 'Open Source' },
    { name: 'Cloud Computing' },
    { name: 'Machine Learning' },
    { name: 'Photography' },
    { name: 'Hiking' },
    { name: 'Chess' },
  ],
};