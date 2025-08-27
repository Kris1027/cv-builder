// Form instance types - we'll define our own since TanStack Form's types are complex

// Form field state types
export interface FieldState<T = string> {
  value: T;
  meta: {
    errors?: string[];
    isValidating?: boolean;
    isTouched?: boolean;
  };
}

// Form field API types
export interface FieldApi<T = string> {
  name: string;
  state: FieldState<T>;
  handleChange: (value: T) => void;
  handleBlur: () => void;
}

// Form values types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface CVFormValues {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skillsPlaceholder: string;
  languages: Language[];
}

// For TanStack Form we use a generic type since the actual types are complex
// This allows us to avoid 'any' in most places while still being practical
export type CVFormInstance = {
  state: {
    values: CVFormValues;
    isSubmitting: boolean;
    canSubmit: boolean;
  };
  Field: React.ComponentType<{
    name: string;
    validators?: Record<string, unknown>;
    children: (field: unknown) => React.ReactNode;
  }>;
  Subscribe: React.ComponentType<{
    children: (state: { isSubmitting: boolean; canSubmit: boolean }) => React.ReactNode;
  }>;
  setFieldValue: (name: string, value: unknown) => void;
  handleSubmit: () => void;
};

// Component props types  
export interface FormSectionProps {
  form: CVFormInstance;
}

export interface ExperienceSectionProps extends FormSectionProps {
  experience: Experience[];
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateExperience: (index: number, field: keyof Experience, value: string | boolean) => void;
}

export interface EducationSectionProps extends FormSectionProps {
  education: Education[];
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
}

export interface LanguagesSectionProps extends FormSectionProps {
  languages: Language[];
  addLanguage: () => void;
  removeLanguage: (index: number) => void;
  updateLanguage: (index: number, field: keyof Language, value: string) => void;
}