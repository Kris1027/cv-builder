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
    CVFormValues,
    EducationProps,
    ExperienceProps,
    InterestProps,
    LanguageLevelProps,
    LanguageProps,
    PersonalInfoProps,
    SkillProps,
} from '@/types/form-types';
import { useForm } from '@tanstack/react-form';
import { cvFormSchema } from '@/schemas/cv-schema';
import {
    ArrowLeft,
    CheckCircle,
    Save,
    RotateCcw,
    AlertTriangle,
    Upload,
    FileWarning,
} from 'lucide-react';
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

    // Default values for nested objects to backfill missing keys from older saves
    const emptyPersonalInfo: PersonalInfoProps = {
        firstName: '',
        lastName: '',
        location: '',
        title: '',
        phone: '',
        email: '',
        website: '',
        linkedin: '',
        github: '',
    };

    const emptyGdprConsent = { enabled: false, companyName: '' };

    // Get initial values - load from localStorage if available, otherwise defaults
    const getInitialValues = () => {
        const storedData = localStorage.getItem('cvData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return {
                ...parsedData,
                // Always use URL templateId when explicitly provided, otherwise fall back to stored value
                templateId: search.templateId || parsedData.templateId || activeTemplateId,
                // Deep-merge personalInfo to backfill missing keys from older saves
                personalInfo: { ...emptyPersonalInfo, ...parsedData.personalInfo },
                // Ensure arrays default to empty if missing from older saves
                experiences: parsedData.experiences ?? [],
                education: parsedData.education ?? [],
                skills: parsedData.skills ?? [],
                languages: parsedData.languages ?? [],
                interests: parsedData.interests ?? [],
                // Deep-merge gdprConsent to backfill missing keys from older saves
                gdprConsent: { ...emptyGdprConsent, ...parsedData.gdprConsent },
            };
        }

        // Return default values for new CV
        return {
            templateId: activeTemplateId,
            personalInfo: emptyPersonalInfo as PersonalInfoProps,
            experiences: [] as ExperienceProps[],
            education: [] as EducationProps[],
            skills: [] as SkillProps[],
            languages: [] as LanguageProps[],
            interests: [] as InterestProps[],
            gdprConsent: emptyGdprConsent,
        };
    };

    const form = useForm({
        defaultValues: getInitialValues(),
        validators: {
            onChange: cvFormSchema,
        },
        onSubmit: async ({ value }) => {
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
        if (
            search.templateId &&
            (form.getFieldValue('templateId') as string) !== search.templateId
        ) {
            form.setFieldValue('templateId', search.templateId);
        }
    }, [search.templateId, form]);

    // Manual save function
    const handleManualSave = () => {
        setIsSaving(true);
        const formData = form.state.values as CVFormValues;
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
        form.reset({
            templateId: activeTemplateId,
            personalInfo: emptyPersonalInfo as PersonalInfoProps,
            experiences: [] as ExperienceProps[],
            education: [] as EducationProps[],
            skills: [] as SkillProps[],
            languages: [] as LanguageProps[],
            interests: [] as InterestProps[],
            gdprConsent: emptyGdprConsent,
        });
    };

    // Load CV from PDF
    const handleLoadPDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoadingPDF(true);
        try {
            const cvData = await loadCVFromPDF(file);

            // Normalize PDF data by merging with defaults to backfill missing keys
            const normalizedPersonalInfo = { ...emptyPersonalInfo, ...cvData.personalInfo };
            const normalizedGdprConsent = { ...emptyGdprConsent, ...cvData.gdprConsent };

            // Build the complete new form values
            // PDF metadata (CVData) doesn't include templateId — fall back to
            // the currently active template so form.reset() gets a valid string
            // and the Zod schema doesn't trigger a "fix errors" validation message.
            const newValues = {
                templateId: cvData.templateId || activeTemplateId,
                personalInfo: normalizedPersonalInfo,
                experiences: cvData.experiences ?? [],
                education: cvData.education ?? [],
                skills: cvData.skills ?? [],
                languages: cvData.languages ?? [],
                interests: cvData.interests ?? [],
                gdprConsent: normalizedGdprConsent,
            };

            // Persist first so getInitialValues() returns matching data on
            // re-render, preventing useForm's update() from overwriting the reset
            localStorage.setItem('cvData', JSON.stringify(newValues));

            // Reset the form with all values at once — no intermediate
            // validation states and no stale errors
            form.reset(newValues);

            // PDF loaded - user can manually save when ready
        } catch (error) {
            console.error('Error loading PDF:', error);
            const errorMessage =
                error instanceof Error ? error.message : 'An unexpected error occurred';
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
            ...(form.getFieldValue('experiences') as ExperienceProps[]),
        ]);
    };

    const removeExperience = (index: number) => {
        const experiences = form.getFieldValue('experiences') as ExperienceProps[];
        form.setFieldValue(
            'experiences',
            experiences.filter((_, i) => i !== index),
        );
    };

    const reorderExperiences = (oldIndex: number, newIndex: number) => {
        const experiences = [...(form.getFieldValue('experiences') as ExperienceProps[])];
        const [removed] = experiences.splice(oldIndex, 1);
        experiences.splice(newIndex, 0, removed);
        form.setFieldValue('experiences', experiences);
    };

    const addEducation = () => {
        form.setFieldValue('education', [
            ...(form.getFieldValue('education') as EducationProps[]),
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
        const education = form.getFieldValue('education') as EducationProps[];
        form.setFieldValue(
            'education',
            education.filter((_, i) => i !== index),
        );
    };

    const reorderEducation = (oldIndex: number, newIndex: number) => {
        const education = [...(form.getFieldValue('education') as EducationProps[])];
        const [removed] = education.splice(oldIndex, 1);
        education.splice(newIndex, 0, removed);
        form.setFieldValue('education', education);
    };

    const addSkill = () => {
        form.setFieldValue('skills', [
            ...(form.getFieldValue('skills') as SkillProps[]),
            { name: '' },
        ]);
    };

    const removeSkill = (index: number) => {
        const skills = form.getFieldValue('skills') as SkillProps[];
        form.setFieldValue(
            'skills',
            skills.filter((_, i) => i !== index),
        );
    };

    const reorderSkills = (oldIndex: number, newIndex: number) => {
        const skills = [...(form.getFieldValue('skills') as SkillProps[])];
        const [removed] = skills.splice(oldIndex, 1);
        skills.splice(newIndex, 0, removed);
        form.setFieldValue('skills', skills);
    };

    const addLanguage = () => {
        form.setFieldValue('languages', [
            ...(form.getFieldValue('languages') as LanguageProps[]),
            { language: '', proficiency: 'A1' as LanguageLevelProps },
        ]);
    };

    const removeLanguage = (index: number) => {
        const languages = form.getFieldValue('languages') as LanguageProps[];
        form.setFieldValue(
            'languages',
            languages.filter((_, i) => i !== index),
        );
    };

    const reorderLanguages = (oldIndex: number, newIndex: number) => {
        const languages = [...(form.getFieldValue('languages') as LanguageProps[])];
        const [removed] = languages.splice(oldIndex, 1);
        languages.splice(newIndex, 0, removed);
        form.setFieldValue('languages', languages);
    };

    const addInterest = () => {
        form.setFieldValue('interests', [
            ...(form.getFieldValue('interests') as InterestProps[]),
            { name: '' },
        ]);
    };

    const removeInterest = (index: number) => {
        const interests = form.getFieldValue('interests') as InterestProps[];
        form.setFieldValue(
            'interests',
            interests.filter((_, i) => i !== index),
        );
    };

    const reorderInterests = (oldIndex: number, newIndex: number) => {
        const interests = [...(form.getFieldValue('interests') as InterestProps[])];
        const [removed] = interests.splice(oldIndex, 1);
        interests.splice(newIndex, 0, removed);
        form.setFieldValue('interests', interests);
    };

    // Calculate form progress
    const calculateProgress = () => {
        const values = form.state.values as CVFormValues;
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50/50 transition-colors dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
            {/* Navigation Bar */}
            <div className="sticky top-0 z-10 border-b border-white/20 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/5 dark:bg-gray-900/80">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/templates">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    type="button"
                                    className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {t('nav.backToTemplates')}
                                </Button>
                            </Link>
                            <h1 className="font-display bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
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
                                className="transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                {isLoadingPDF ? t('builder.loading') : t('builder.loadPdf')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleManualSave}
                                disabled={isSaving}
                                className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? t('builder.saving') : t('builder.save')}
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        {t('builder.reset')}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                            </div>
                                            <AlertDialogTitle>
                                                {t('dialogs.reset.title')}
                                            </AlertDialogTitle>
                                        </div>
                                        <AlertDialogDescription className="pt-2">
                                            {t('dialogs.reset.description')}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            {t('dialogs.reset.cancel')}
                                        </AlertDialogCancel>
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
                            <AlertDialog
                                open={!!pdfLoadError}
                                onOpenChange={(open) => !open && setPdfLoadError(null)}
                            >
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                                <FileWarning className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <AlertDialogTitle>
                                                {t('dialogs.pdfError.title')}
                                            </AlertDialogTitle>
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
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        {t('builder.saved', {
                                            time: lastSaved.toLocaleTimeString(),
                                        })}
                                    </span>
                                </div>
                            )}
                            <div className="rounded-full border border-slate-200/60 bg-white/60 px-3 py-1 text-sm text-slate-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-400">
                                <span className="hidden sm:inline">{t('builder.template')}: </span>
                                <span className="font-medium">
                                    {getTemplateName(activeTemplateId)}
                                </span>
                            </div>
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-8">
                {/* Progress Indicator */}
                <div className="animate-fade-in-up mb-8 rounded-2xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur-sm transition-colors dark:border-white/5 dark:bg-white/[0.03]">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="font-display text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('builder.progress.title')}
                        </span>
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                            {calculateProgress()}%
                        </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
                            style={{ width: `${calculateProgress()}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
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
                    <div className="animate-fade-in-up delay-1">
                        <PersonalInfoSection form={form} />
                    </div>

                    {/* Work Experience Section */}
                    <div className="animate-fade-in-up delay-2">
                        <ExperienceSection
                            form={form}
                            addExperience={addExperience}
                            removeExperience={removeExperience}
                            reorderExperiences={reorderExperiences}
                        />
                    </div>

                    {/* Education Section */}
                    <div className="animate-fade-in-up delay-3">
                        <EducationSection
                            form={form}
                            addEducation={addEducation}
                            removeEducation={removeEducation}
                            reorderEducation={reorderEducation}
                        />
                    </div>

                    {/* Skills Section */}
                    <div className="animate-fade-in-up delay-4">
                        <SkillsSection
                            form={form}
                            addSkill={addSkill}
                            removeSkill={removeSkill}
                            reorderSkills={reorderSkills}
                        />
                    </div>

                    {/* Languages Section */}
                    <div className="animate-fade-in-up delay-5">
                        <LanguagesSection
                            form={form}
                            addLanguage={addLanguage}
                            removeLanguage={removeLanguage}
                            reorderLanguages={reorderLanguages}
                        />
                    </div>

                    {/* Interests Section */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                        <InterestsSection
                            form={form}
                            addInterest={addInterest}
                            removeInterest={removeInterest}
                            reorderInterests={reorderInterests}
                        />
                    </div>

                    {/* GDPR Consent Section */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                        <GdprConsentSection form={form} />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-6">
                        <form.Subscribe
                            selector={(state) => [
                                state.canSubmit,
                                state.isSubmitting,
                                state.isValid,
                            ]}
                            children={([canSubmit, isSubmitting, isValid]) => (
                                <>
                                    <div className="text-sm text-gray-500">
                                        {!isValid && (
                                            <span className="text-red-500">
                                                {t('builder.validation.fixErrors')}
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit || calculateProgress() < 30}
                                        size="lg"
                                        className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg transition-all hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl"
                                    >
                                        {isSubmitting
                                            ? t('builder.processing')
                                            : `${t('builder.previewCv')} →`}
                                    </Button>
                                </>
                            )}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuilderPage;
