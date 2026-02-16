import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Eye, ArrowLeft, RotateCcw, FileCheck, AlertTriangle } from 'lucide-react';
import { DeveloperPreview } from '@/components/template-previews/developer-preview';
import { DefaultPreview } from '@/components/template-previews/default-preview';
import { VeterinaryPreview } from '@/components/template-previews/veterinary-preview';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

const templates = [
  {
    id: 'developer',
    nameKey: 'templates.developer.name',
    descriptionKey: 'templates.developer.description',
    Preview: DeveloperPreview,
  },
  {
    id: 'default',
    nameKey: 'templates.default.name',
    descriptionKey: 'templates.default.description',
    Preview: DefaultPreview,
  },
  {
    id: 'veterinary',
    nameKey: 'templates.veterinary.name',
    descriptionKey: 'templates.veterinary.description',
    Preview: VeterinaryPreview,
  },
];

export function TemplatesPage() {
  const { t } = useTranslation();
  const [hasSavedData, setHasSavedData] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    const savedTime = localStorage.getItem('cvData_lastSaved');

    if (savedData) {
      setHasSavedData(true);
      if (savedTime) {
        setLastSaved(new Date(savedTime));
      }
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem('cvData');
    localStorage.removeItem('cvData_backup');
    localStorage.removeItem('cvData_lastSaved');
    setHasSavedData(false);
    setLastSaved(null);
  };

  const formatSavedTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t('savedData.justNow');
    if (diffMins < 60) return diffMins === 1
      ? t('savedData.minuteAgo', { count: diffMins })
      : t('savedData.minutesAgo', { count: diffMins });
    if (diffHours < 24) return diffHours === 1
      ? t('savedData.hourAgo', { count: diffHours })
      : t('savedData.hoursAgo', { count: diffHours });
    if (diffDays < 7) return diffDays === 1
      ? t('savedData.dayAgo', { count: diffDays })
      : t('savedData.daysAgo', { count: diffDays });
    return date.toLocaleDateString();
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors'>
      {/* Navigation Bar */}
      <div className='sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Link to='/'>
                <Button variant='outline' size='sm' className='dark:hover:bg-gray-800'>
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  {t('nav.backToHome')}
                </Button>
              </Link>
              <h1 className='text-xl font-semibold dark:text-gray-100'>{t('templates.title')}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='animate-fade-in-up mb-8'>
          <h1 className='text-3xl font-bold mb-2 dark:text-gray-100'>{t('templates.pageTitle')}</h1>
          <p className='text-gray-600 dark:text-gray-400'>
            {t('templates.pageSubtitle')}
          </p>
        </div>

        {/* Saved Data Info */}
        {hasSavedData && (
          <div className='animate-fade-in-up delay-1 mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50'>
                  <FileCheck className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='font-medium text-blue-800 dark:text-blue-300'>{t('savedData.title')}</p>
                  {lastSaved && (
                    <p className='text-sm text-blue-600 dark:text-blue-400'>
                      {t('savedData.lastSaved', { time: formatSavedTime(lastSaved) })}
                    </p>
                  )}
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors'
                  >
                    <RotateCcw className='w-4 h-4 mr-2' />
                    {t('builder.reset')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30'>
                        <AlertTriangle className='h-5 w-5 text-red-600 dark:text-red-400' />
                      </div>
                      <AlertDialogTitle>{t('dialogs.reset.title')}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className='pt-2'>
                      {t('dialogs.reset.description')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('dialogs.reset.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReset}
                      className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
                    >
                      {t('dialogs.reset.confirm')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className='animate-fade-in-up group overflow-hidden border-0 shadow-sm hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1'
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Image Section */}
              <Link to='/templates/$templateId' params={{ templateId: template.id }}>
                <div className='aspect-[3/3] relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-3'>
                  {/* Template Preview SVG */}
                  <div className='w-full h-full transition-transform duration-500 group-hover:scale-110 text-gray-900'>
                    <template.Preview />
                  </div>

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  {/* Preview Button - appears on hover */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                      <div className='bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg'>
                        <Eye className='w-4 h-4 text-gray-700' />
                        <span className='text-sm font-medium text-gray-700'>{t('templates.preview')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Card Header with Title */}
              <CardHeader className='pb-2 pt-3'>
                <h3 className='text-base font-semibold text-gray-900 dark:text-gray-100'>
                  {t(template.nameKey)}
                </h3>
              </CardHeader>

              {/* Card Content with Description */}
              <CardContent className='pt-0 pb-3'>
                <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2'>
                  {t(template.descriptionKey)}
                </p>
              </CardContent>

              {/* Card Footer with Action Buttons */}
              <CardFooter className='flex gap-2 pt-0 pb-3'>
                <Link to='/templates/$templateId' params={{ templateId: template.id }} className='flex-1'>
                  <Button
                    variant='outline'
                    className='w-full group/btn hover:bg-gray-50 dark:hover:bg-gray-800'
                    size='sm'
                  >
                    <Eye className='w-3.5 h-3.5 mr-1.5 transition-transform group-hover/btn:scale-110' />
                    <span className='text-xs'>{t('templates.preview')}</span>
                  </Button>
                </Link>
                <Link to='/builder' search={{ templateId: template.id }} className='flex-1'>
                  <Button
                    className='w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-sm hover:shadow-md transition-all'
                    size='sm'
                  >
                    <span className='text-xs'>{t('templates.useTemplate')}</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
