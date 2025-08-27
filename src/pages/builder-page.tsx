import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import React from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  PersonalInfoSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  InterestsSection,
  LanguagesSection
} from '../components/cv-form';
import type { CVFormInstance } from '@/types/form-types';
const BuilderPage = () => {
  const form = useForm({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
      },
      experience: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
      education: [
        {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      skillsPlaceholder: '', // We'll manage skills separately
      languages: [
        {
          language: '',
          proficiency: 'Beginner',
        },
      ],
    },
    onSubmit: async ({ value }) => {
      const finalData = {
        ...value,
        skills: skills,
        interests: interests,
      };
      console.log('CV Data:', finalData);
      // TODO: Handle CV generation/download
    },
  });

  // Experience handlers
  const addExperience = () => {
    form.setFieldValue('experience', [
      ...form.state.values.experience,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ]);
  };

  const removeExperience = (index: number) => {
    form.setFieldValue(
      'experience',
      form.state.values.experience.filter((_, i) => i !== index)
    );
  };

  // Education handlers
  const addEducation = () => {
    form.setFieldValue('education', [
      ...form.state.values.education,
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    form.setFieldValue(
      'education',
      form.state.values.education.filter((_, i) => i !== index)
    );
  };

  // Languages handlers
  const addLanguage = () => {
    form.setFieldValue('languages', [
      ...form.state.values.languages,
      {
        language: '',
        proficiency: 'Beginner',
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    form.setFieldValue(
      'languages',
      form.state.values.languages.filter((_, i) => i !== index)
    );
  };

  // Skills state and handlers
  const [skillInput, setSkillInput] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>([]);

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Interests state and handlers
  const [interestInput, setInterestInput] = React.useState('');
  const [interests, setInterests] = React.useState<string[]>([]);

  const addInterest = (interest: string) => {
    if (interest.trim() && !interests.includes(interest.trim())) {
      setInterests([...interests, interest.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Build Your CV</h1>
          <p className="text-muted-foreground">Fill in your details to create a professional CV</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <PersonalInfoSection form={form as CVFormInstance} />
          
          <ExperienceSection 
            form={form as CVFormInstance} 
            addExperience={addExperience} 
            removeExperience={removeExperience} 
          />
          
          <EducationSection 
            form={form as CVFormInstance} 
            addEducation={addEducation} 
            removeEducation={removeEducation} 
          />
          
          <SkillsSection
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            skills={skills}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
          
          <InterestsSection
            interestInput={interestInput}
            setInterestInput={setInterestInput}
            interests={interests}
            addInterest={addInterest}
            removeInterest={removeInterest}
          />
          
          <LanguagesSection
            form={form as CVFormInstance}
            addLanguage={addLanguage}
            removeLanguage={removeLanguage}
          />

          {/* Submit Button */}
          <div className="flex gap-4">
            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  disabled={state.isSubmitting || !state.canSubmit}
                  className="flex-1"
                >
                  {state.isSubmitting ? 'Generating CV...' : 'Generate CV'}
                </Button>
              )}
            </form.Subscribe>
            <Button type="button" variant="outline" className="flex-1">
              Preview
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderPage;