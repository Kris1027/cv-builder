export interface ResumeDataProps {
  personalInfo: PersonalInfoProps;
  experience: ExperienceProps[];
  education: EducationProps[];
  languages: LanguageProps[];
  skills: SkillProps[];
  interests: InterestProps[];
}

export interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceProps {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationProps {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface LanguageProps {
  language: string;
  proficiency: string;
}

export interface SkillProps {
  name: string;
}

export interface InterestProps {
  name: string;
}
