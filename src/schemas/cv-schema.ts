import { z } from 'zod';

const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE'] as const;

const personalInfoSchema = z.object({
    firstName: z.string().min(1, 'validation.firstNameRequired'),
    lastName: z.string().min(1, 'validation.lastNameRequired'),
    location: z.string(),
    title: z.string(),
    phone: z.string(),
    email: z.string().min(1, 'validation.emailRequired').email('validation.invalidEmail'),
    website: z.string(),
    linkedin: z.string(),
    github: z.string(),
});

const experienceSchema = z.object({
    company: z.string(),
    position: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    current: z.boolean(),
    description: z.string(),
});

const educationSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
});

const skillSchema = z.object({
    name: z.string(),
});

const languageSchema = z.object({
    language: z.string(),
    proficiency: z.enum(LANGUAGE_LEVELS),
});

const interestSchema = z.object({
    name: z.string(),
});

const gdprConsentSchema = z.object({
    enabled: z.boolean(),
    companyName: z.string(),
});

export const cvFormSchema = z.object({
    templateId: z.string(),
    personalInfo: personalInfoSchema,
    experiences: z.array(experienceSchema),
    education: z.array(educationSchema),
    skills: z.array(skillSchema),
    languages: z.array(languageSchema),
    interests: z.array(interestSchema),
    gdprConsent: gdprConsentSchema,
});

export type CVFormSchemaValues = z.infer<typeof cvFormSchema>;
