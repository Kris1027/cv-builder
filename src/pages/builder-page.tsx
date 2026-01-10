import { Button } from '@/components/ui/button';
import { PersonalInfoSection } from '@/components/form-sections/personal-info-section';
import { ExperienceSection } from '@/components/form-sections/experience-section';
import { EducationSection } from '@/components/form-sections/education-section';
import { SkillsSection } from '@/components/form-sections/skills-section';
import { LanguagesSection } from '@/components/form-sections/languages-section';
import { InterestsSection } from '@/components/form-sections/interests-section';
import { ThemeToggle } from '@/components/theme-toggle';
import type {
  EducationProps,
  ExperienceProps,
  InterestProps,
  LanguageLevelProps,
  LanguageProps,
  PersonalInfoProps,
  SkillProps,
} from '@/types/form-types';
import { useForm } from '@tanstack/react-form';
import { ArrowLeft, CheckCircle, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearch } from '@tanstack/react-router';

interface BuilderPageProps {
  templateId?: string;
}

const BuilderPage = ({ templateId = 'modern' }: BuilderPageProps) => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/builder' }) as { templateId?: string; edit?: boolean };
  const isEditMode = search.edit === true;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Use search param if available, otherwise fall back to prop
  const activeTemplateId = search.templateId || templateId;
  
  // Get initial values - either from localStorage in edit mode or defaults
  const getInitialValues = () => {
    if (isEditMode) {
      const storedData = localStorage.getItem('cvData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        return {
          ...parsedData,
          templateId: parsedData.templateId || activeTemplateId,
        };
      }
    }
    
    // Return default values for new CV
    return {
      templateId: activeTemplateId,
      personalInfo: {
        firstName: '',
        lastName: '',
        location: '',
        title: '',
        phone: '',
        email: '',
        website: '',
        linkedin: '',
        github: '',
      } as PersonalInfoProps,
      experiences: [] as ExperienceProps[],
      education: [] as EducationProps[],
      skills: [] as SkillProps[],
      languages: [] as LanguageProps[],
      interests: [] as InterestProps[],
    };
  };
  
  const form = useForm({
    defaultValues: getInitialValues(),
    onSubmit: async ({ value }) => {
      // Validate required fields
      const errors: Record<string, string> = {};
      
      if (!value.personalInfo.firstName) errors['firstName'] = 'First name is required';
      if (!value.personalInfo.lastName) errors['lastName'] = 'Last name is required';
      if (!value.personalInfo.email) errors['email'] = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.personalInfo.email)) {
        errors['email'] = 'Please enter a valid email address';
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        // Scroll to the first error
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      setIsSaving(true);
      // Store data in localStorage for persistence
      localStorage.setItem('cvData', JSON.stringify(value));
      setLastSaved(new Date());
      setIsSaving(false);
      
      // Navigate to preview page with templateId
      navigate({ to: '/preview', search: { templateId: value.templateId } });
    },
  });
  
  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      const formData = form.state.values;
      localStorage.setItem('cvData', JSON.stringify(formData));
      localStorage.setItem('cvData_backup', JSON.stringify(formData));
      setLastSaved(new Date());
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearInterval(autoSave);
  }, [form.state.values]);

  // Manual save function
  const handleManualSave = () => {
    setIsSaving(true);
    const formData = form.state.values;
    localStorage.setItem('cvData', JSON.stringify(formData));
    localStorage.setItem('cvData_backup', JSON.stringify(formData));
    setLastSaved(new Date());
    setTimeout(() => setIsSaving(false), 500);
  };

  const addExperience = () => {
    form.setFieldValue('experiences', [
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
      ...form.getFieldValue('experiences'),
    ]);
  };

  const removeExperience = (index: number) => {
    const experiences = form.getFieldValue('experiences');
    form.setFieldValue(
      'experiences',
      experiences.filter((_: ExperienceProps, i: number) => i !== index)
    );
  };

  const reorderExperiences = (oldIndex: number, newIndex: number) => {
    const experiences = [...form.getFieldValue('experiences')];
    const [removed] = experiences.splice(oldIndex, 1);
    experiences.splice(newIndex, 0, removed);
    form.setFieldValue('experiences', experiences);
  };

  const addEducation = () => {
    form.setFieldValue('education', [
      ...form.getFieldValue('education'),
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
    const education = form.getFieldValue('education');
    form.setFieldValue(
      'education',
      education.filter((_: EducationProps, i: number) => i !== index)
    );
  };

  const addSkill = () => {
    form.setFieldValue('skills', [...form.getFieldValue('skills'), { name: '' }]);
  };

  const removeSkill = (index: number) => {
    const skills = form.getFieldValue('skills');
    form.setFieldValue(
      'skills',
      skills.filter((_: SkillProps, i: number) => i !== index)
    );
  };

  const reorderSkills = (oldIndex: number, newIndex: number) => {
    const skills = [...form.getFieldValue('skills')];
    const [removed] = skills.splice(oldIndex, 1);
    skills.splice(newIndex, 0, removed);
    form.setFieldValue('skills', skills);
  };

  const addLanguage = () => {
    form.setFieldValue('languages', [
      ...form.getFieldValue('languages'),
      { language: '', proficiency: 'A1' as LanguageLevelProps },
    ]);
  };

  const removeLanguage = (index: number) => {
    const languages = form.getFieldValue('languages');
    form.setFieldValue(
      'languages',
      languages.filter((_: LanguageProps, i: number) => i !== index)
    );
  };

  const reorderLanguages = (oldIndex: number, newIndex: number) => {
    const languages = [...form.getFieldValue('languages')];
    const [removed] = languages.splice(oldIndex, 1);
    languages.splice(newIndex, 0, removed);
    form.setFieldValue('languages', languages);
  };

  const addInterest = () => {
    form.setFieldValue('interests', [...form.getFieldValue('interests'), { name: '' }]);
  };

  const removeInterest = (index: number) => {
    const interests = form.getFieldValue('interests');
    form.setFieldValue(
      'interests',
      interests.filter((_: InterestProps, i: number) => i !== index)
    );
  };

  // Calculate form progress
  const calculateProgress = () => {
    const values = form.state.values;
    let progress = 0;
    
    // Personal info (30%)
    if (values.personalInfo.firstName) progress += 10;
    if (values.personalInfo.lastName) progress += 10;
    if (values.personalInfo.email) progress += 10;
    
    // Experience (25%)
    if (values.experiences.length > 0) progress += 25;
    
    // Education (20%)
    if (values.education.length > 0) progress += 20;
    
    // Skills (15%)
    if (values.skills.length > 0) progress += 15;
    
    // Languages (5%)
    if (values.languages.length > 0) progress += 5;
    
    // Interests (5%)
    if (values.interests.length > 0) progress += 5;
    
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/templates">
                <Button variant="outline" size="sm" type="button" className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Build Your CV
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleManualSave}
                disabled={isSaving}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="hidden sm:inline">Template: </span>
                <span className="font-medium capitalize">{activeTemplateId}</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Indicator */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm dark:shadow-gray-900/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Form Progress</span>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {calculateProgress() === 100 
              ? "Great! Your CV is complete. Click 'Preview CV' to see the result."
              : "Complete all sections to maximize your CV's impact."}
          </div>
        </div>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Personal Information Section */}
          <PersonalInfoSection 
            form={form}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />

          {/* Work Experience Section */}
          <ExperienceSection
            form={form}
            addExperience={addExperience}
            removeExperience={removeExperience}
            reorderExperiences={reorderExperiences}
          />

          {/* Education Section */}
          <EducationSection
            form={form}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />

          {/* Skills Section */}
          <SkillsSection
            form={form}
            addSkill={addSkill}
            removeSkill={removeSkill}
            reorderSkills={reorderSkills}
          />

          {/* Languages Section */}
          <LanguagesSection
            form={form}
            addLanguage={addLanguage}
            removeLanguage={removeLanguage}
            reorderLanguages={reorderLanguages}
          />

          {/* Interests Section */}
          <InterestsSection
            form={form}
            addInterest={addInterest}
            removeInterest={removeInterest}
          />

          {/* Submit Button */}
          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-gray-500">
              {validationErrors && Object.keys(validationErrors).length > 0 && (
                <span className="text-red-500">Please fix the errors above before proceeding.</span>
              )}
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button 
                  type='submit' 
                  disabled={!canSubmit || calculateProgress() < 30}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? 'Processing...' : 'Preview CV →'}
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderPage;