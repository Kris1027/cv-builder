import { Button } from '@/components/ui/button';
import { PersonalInfoSection } from '@/components/form-sections/personal-info-section';
import { ExperienceSection } from '@/components/form-sections/experience-section';
import { EducationSection } from '@/components/form-sections/education-section';
import { SkillsSection } from '@/components/form-sections/skills-section';
import { LanguagesSection } from '@/components/form-sections/languages-section';
import { InterestsSection } from '@/components/form-sections/interests-section';
import { GdprConsentSection } from '@/components/form-sections/gdpr-consent-section';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
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
import { ArrowLeft, CheckCircle, Save, RotateCcw, AlertTriangle, Upload, FileWarning } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState, useRef, useEffect } from 'react';
import { loadCVFromPDF } from '@/lib/pdf-parser';
import { useNavigate, Link, useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

interface BuilderPageProps {
  templateId?: string;
}

const BuilderPage = ({ templateId = 'developer' }: BuilderPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useSearch({ from: '/builder' }) as { templateId?: string };
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use search param if available, otherwise fall back to prop
  const activeTemplateId = search.templateId || templateId;

  // Convert template ID to display name
  const getTemplateName = (id: string) => {
    switch (id) {
      case 'developer':
        return t('templates.developer.name');
      case 'default':
        return t('templates.default.name');
      case 'veterinary':
        return t('templates.veterinary.name');
      default:
        return id;
    }
  };

  // Get initial values - load from localStorage if available, otherwise defaults
  const getInitialValues = () => {
    const storedData = localStorage.getItem('cvData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return {
        ...parsedData,
        // Always use URL templateId when explicitly provided, otherwise fall back to stored value
        templateId: search.templateId || parsedData.templateId || activeTemplateId,
        // Ensure gdprConsent has defaults for older saved data
        gdprConsent: parsedData.gdprConsent ?? { enabled: false, companyName: '' },
      };
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
      gdprConsent: { enabled: false, companyName: '' },
    };
  };

  const form = useForm({
    defaultValues: getInitialValues(),
    onSubmit: async ({ value }) => {
      // Validate required fields
      const errors: Record<string, string> = {};

      if (!value.personalInfo.firstName) errors['firstName'] = t('validation.firstNameRequired');
      if (!value.personalInfo.lastName) errors['lastName'] = t('validation.lastNameRequired');
      if (!value.personalInfo.email) errors['email'] = t('validation.emailRequired');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.personalInfo.email)) {
        errors['email'] = t('validation.invalidEmail');
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
      const now = new Date();
      localStorage.setItem('cvData_lastSaved', now.toISOString());
      setLastSaved(now);
      setIsSaving(false);

      // Navigate to preview page with templateId
      navigate({ to: '/preview', search: { templateId: value.templateId } });
    },
  });

  // Sync form templateId when URL parameter changes
  useEffect(() => {
    if (search.templateId && form.getFieldValue('templateId') !== search.templateId) {
      form.setFieldValue('templateId', search.templateId);
    }
  }, [search.templateId, form]);

  // Manual save function
  const handleManualSave = () => {
    setIsSaving(true);
    const formData = form.state.values;
    localStorage.setItem('cvData', JSON.stringify(formData));
    localStorage.setItem('cvData_backup', JSON.stringify(formData));
    const now = new Date();
    localStorage.setItem('cvData_lastSaved', now.toISOString());
    setLastSaved(now);
    setTimeout(() => setIsSaving(false), 500);
  };

  // Reset form function
  const handleReset = () => {
    localStorage.removeItem('cvData');
    localStorage.removeItem('cvData_backup');
    localStorage.removeItem('cvData_lastSaved');
    setLastSaved(null);
    setValidationErrors({});
    form.reset();
  };

  // Load CV from PDF
  const handleLoadPDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoadingPDF(true);
    try {
      const cvData = await loadCVFromPDF(file);

      // Update form with parsed data
      form.setFieldValue('templateId', cvData.templateId);
      form.setFieldValue('personalInfo', cvData.personalInfo);
      form.setFieldValue('experiences', cvData.experiences);
      form.setFieldValue('education', cvData.education);
      form.setFieldValue('skills', cvData.skills);
      form.setFieldValue('languages', cvData.languages);
      form.setFieldValue('interests', cvData.interests);

      // Clear validation errors - user can manually save when ready
      setValidationErrors({});
    } catch (error) {
      console.error('Error loading PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setPdfLoadError(errorMessage);
    } finally {
      setIsLoadingPDF(false);
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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

  const reorderEducation = (oldIndex: number, newIndex: number) => {
    const education = [...form.getFieldValue('education')];
    const [removed] = education.splice(oldIndex, 1);
    education.splice(newIndex, 0, removed);
    form.setFieldValue('education', education);
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

  const reorderInterests = (oldIndex: number, newIndex: number) => {
    const interests = [...form.getFieldValue('interests')];
    const [removed] = interests.splice(oldIndex, 1);
    interests.splice(newIndex, 0, removed);
    form.setFieldValue('interests', interests);
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
                  {t('nav.backToTemplates')}
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('builder.title')}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Hidden file input for PDF loading */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLoadPDF}
                accept=".pdf"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoadingPDF}
                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isLoadingPDF ? t('builder.loading') : t('builder.loadPdf')}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleManualSave}
                disabled={isSaving}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? t('builder.saving') : t('builder.save')}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t('builder.reset')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <AlertDialogTitle>{t('dialogs.reset.title')}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="pt-2">
                      {t('dialogs.reset.description')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('dialogs.reset.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReset}
                      className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                      {t('dialogs.reset.confirm')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* PDF Load Error Dialog */}
              <AlertDialog open={!!pdfLoadError} onOpenChange={(open) => !open && setPdfLoadError(null)}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                        <FileWarning className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <AlertDialogTitle>{t('dialogs.pdfError.title')}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="pt-2">
                      {pdfLoadError}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setPdfLoadError(null)}>
                      {t('dialogs.pdfError.ok')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('builder.saved', { time: lastSaved.toLocaleTimeString() })}</span>
                </div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="hidden sm:inline">{t('builder.template')}: </span>
                <span className="font-medium">{getTemplateName(activeTemplateId)}</span>
              </div>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Indicator */}
        <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm dark:shadow-gray-900/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('builder.progress.title')}</span>
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
              ? t('builder.progress.complete')
              : t('builder.progress.incomplete')}
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
            reorderEducation={reorderEducation}
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
            reorderInterests={reorderInterests}
          />

          {/* GDPR Consent Section */}
          <GdprConsentSection form={form} />

          {/* Submit Button */}
          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-gray-500">
              {validationErrors && Object.keys(validationErrors).length > 0 && (
                <span className="text-red-500">{t('builder.validation.fixErrors')}</span>
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
                  {isSubmitting ? t('builder.processing') : `${t('builder.previewCv')} →`}
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
