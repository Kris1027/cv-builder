import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { EducationSection } from '@/components/cv-form/education-section';
import { ExperienceSection } from '@/components/cv-form/experience-section';
import { InterestsSection } from '@/components/cv-form/interests-section';
import { LanguagesSection } from '@/components/cv-form/languages-section';
import { PersonalInfoSection } from '@/components/cv-form/personal-info-section';
import { SkillsSection } from '@/components/cv-form/skills-section';
import { Button } from '@/components/ui/button';
import type { CVFormInstance, Education, Experience, Language } from '@/types/form-types';

const BuilderPage = () => {
  // Initialize state for dynamic arrays using proper types
  const [experience, setExperience] = React.useState<Experience[]>([
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ]);

  const [education, setEducation] = React.useState<Education[]>([
    {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

  const [languages, setLanguages] = React.useState<Language[]>([
    {
      language: '',
      proficiency: 'Beginner',
    },
  ]);

  const [skills, setSkills] = React.useState<string[]>([]);
  const [skillInput, setSkillInput] = React.useState('');

  const [interests, setInterests] = React.useState<string[]>([]);
  const [interestInput, setInterestInput] = React.useState('');

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
      experience: experience,
      education: education,
      languages: languages,
      skillsPlaceholder: '', // We'll manage skills separately
    },
    onSubmit: async ({ value }) => {
      // Combine form values with state values
      const finalData = {
        personalInfo: value.personalInfo,
        experience: experience,
        education: education,
        languages: languages,
        skills: skills,
        interests: interests,
      };
      console.log('CV Data:', finalData);
      // TODO: Handle CV generation/download
    },
  });

  // Update form values when state changes
  React.useEffect(() => {
    form.setFieldValue('experience', experience);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience]);

  React.useEffect(() => {
    form.setFieldValue('education', education);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [education]);

  React.useEffect(() => {
    form.setFieldValue('languages', languages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages]);

  // Experience handlers
  const addExperience = () => {
    setExperience([
      ...experience,
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
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setExperience(updatedExperience);
  };

  // Education handlers
  const addEducation = () => {
    setEducation([
      ...education,
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
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setEducation(updatedEducation);
  };

  // Languages handlers
  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: '',
        proficiency: 'Beginner',
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    setLanguages(updatedLanguages);
  };

  // Skills handlers
  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Interests handlers
  const addInterest = (interest: string) => {
    if (interest.trim() && !interests.includes(interest.trim())) {
      setInterests([...interests, interest.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  // Create a modified form object with state values
  const formWithState = {
    ...form,
    state: {
      ...form.state,
      values: {
        ...form.state.values,
        experience: experience,
        education: education,
        languages: languages,
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted/20'>
      <div className='container mx-auto py-8 px-4 max-w-4xl'>
        <div className='mb-8'>
          <Link to='/'>
            <Button variant='ghost' size='sm' className='mb-4'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Button>
          </Link>
          <h1 className='text-3xl font-bold mb-2'>Build Your CV</h1>
          <p className='text-muted-foreground'>Fill in your details to create a professional CV</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className='space-y-8'
        >
          <PersonalInfoSection form={form as CVFormInstance} />

          <ExperienceSection
            form={formWithState as unknown as CVFormInstance}
            experience={experience}
            addExperience={addExperience}
            removeExperience={removeExperience}
            updateExperience={updateExperience}
          />

          <EducationSection
            form={formWithState as unknown as CVFormInstance}
            education={education}
            addEducation={addEducation}
            removeEducation={removeEducation}
            updateEducation={updateEducation}
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
            form={formWithState as unknown as CVFormInstance}
            languages={languages}
            addLanguage={addLanguage}
            removeLanguage={removeLanguage}
            updateLanguage={updateLanguage}
          />

          {/* Submit Button */}
          <div className='flex gap-4'>
            <form.Subscribe>
              {(state) => (
                <Button type='submit' disabled={state.isSubmitting} className='flex-1'>
                  {state.isSubmitting ? 'Generating CV...' : 'Generate CV'}
                </Button>
              )}
            </form.Subscribe>
            <Button type='button' variant='outline' className='flex-1'>
              Preview
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderPage;
