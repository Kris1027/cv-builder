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
  location: string;
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

export interface SkillProps {
  name: string;
}

export type LanguageLevelProps = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'NATIVE';

export interface LanguageProps {
  language: string;
  proficiency: LanguageLevelProps;
}

export interface InterestProps {
  name: string;
}

export interface GdprConsentProps {
  enabled: boolean;
  companyName: string;
}

// Form values type for the entire CV form
export interface CVFormValues {
  templateId: string;
  personalInfo: PersonalInfoProps;
  experiences: ExperienceProps[];
  education: EducationProps[];
  skills: SkillProps[];
  languages: LanguageProps[];
  interests: InterestProps[];
  gdprConsent: GdprConsentProps;
}
