import { useParams, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { DeveloperTemplate } from '@/components/templates/developer-template';
import { DefaultTemplate } from '@/components/templates/default-template';
import { VeterinaryTemplate } from '@/components/templates/veterinary-template';
import { sampleCVData, sampleDefaultCVData, sampleVeterinaryCVData } from '@/data/sample-cv-data';
import {
    sampleCVDataPl,
    sampleDefaultCVDataPl,
    sampleVeterinaryCVDataPl,
} from '@/data/sample-cv-data-pl';
import { ArrowLeft, Edit } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useTranslation } from 'react-i18next';

export function TemplatePage() {
    const { t, i18n } = useTranslation();
    const { templateId } = useParams({ from: '/templates_/$templateId' });
    const isPolish = i18n.language === 'pl';

    const getTemplateName = () => {
        switch (templateId) {
            case 'developer':
                return t('templates.developer.name');
            case 'default':
                return t('templates.default.name');
            case 'veterinary':
                return t('templates.veterinary.name');
            default:
                return 'Template';
        }
    };

    const renderTemplate = () => {
        switch (templateId) {
            case 'developer':
                return <DeveloperTemplate data={isPolish ? sampleCVDataPl : sampleCVData} />;
            case 'default':
                return (
                    <DefaultTemplate
                        data={isPolish ? sampleDefaultCVDataPl : sampleDefaultCVData}
                    />
                );
            case 'veterinary':
                return (
                    <VeterinaryTemplate
                        data={isPolish ? sampleVeterinaryCVDataPl : sampleVeterinaryCVData}
                    />
                );
            default:
                return (
                    <div className='py-8 text-center'>
                        <h1 className='mb-4 text-2xl font-bold'>{t('templates.notFound')}</h1>
                        <Link to='/templates'>
                            <Button>
                                <ArrowLeft className='mr-2 h-4 w-4' />
                                {t('nav.backToTemplates')}
                            </Button>
                        </Link>
                    </div>
                );
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 transition-colors dark:bg-gray-900'>
            {/* Actions Bar */}
            <div className='sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900'>
                <div className='container mx-auto px-4 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Link to='/templates'>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='dark:hover:bg-gray-800'
                                >
                                    <ArrowLeft className='mr-2 h-4 w-4' />
                                    {t('nav.backToTemplates')}
                                </Button>
                            </Link>
                            <h1 className='text-xl font-semibold dark:text-gray-100'>
                                {getTemplateName()} {t('templates.preview')}
                            </h1>
                        </div>

                        <div className='flex items-center gap-3'>
                            <Link to='/builder' search={{ templateId }}>
                                <Button size='sm'>
                                    <Edit className='mr-2 h-4 w-4' />
                                    {t('templates.useTemplate')}
                                </Button>
                            </Link>
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Preview */}
            <div className='py-8'>
                <div className='mx-auto max-w-[210mm] overflow-hidden bg-white text-gray-900 shadow-xl dark:shadow-gray-900/50'>
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
}
