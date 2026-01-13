import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Edit3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';

export const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted/20'>
      {/* Language and Theme Toggle */}
      <div className='absolute top-4 right-4 flex items-center gap-2'>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            {t('home.hero.title')}{' '}
            <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              {t('home.hero.titleHighlight')}
            </span>
          </h1>
          <p className='mb-10 text-xl text-muted-foreground'>
            {t('home.hero.subtitle')}
          </p>
          <div className='flex justify-center'>
            <Link to='/templates'>
              <Button size='lg' className='group'>
                <Edit3 className='mr-2 h-5 w-5' />
                {t('home.hero.cta')}
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
          </div>
          <div className='mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>{t('home.features.noSignup')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>{t('home.features.free')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>{t('home.features.exportPdf')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-2xl text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4'>{t('home.howItWorks.title')}</h2>
            <p className='text-muted-foreground'>
              {t('home.howItWorks.subtitle')}
            </p>
          </div>

          <div className='mx-auto max-w-5xl'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-4 items-start justify-between'>
              {/* Step 1 */}
              <div className='flex-1 text-center relative'>
                <div className='mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium mb-4'>
                  1
                </div>
                <h3 className='font-semibold mb-2'>{t('home.howItWorks.step1Title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('home.howItWorks.step1Desc')}
                </p>
                {/* Connector Line for desktop */}
                <div className='hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-border' />
              </div>

              {/* Step 2 */}
              <div className='flex-1 text-center relative'>
                <div className='mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium mb-4'>
                  2
                </div>
                <h3 className='font-semibold mb-2'>{t('home.howItWorks.step2Title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('home.howItWorks.step2Desc')}
                </p>
                {/* Connector Line for desktop */}
                <div className='hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-border' />
              </div>

              {/* Step 3 */}
              <div className='flex-1 text-center'>
                <div className='mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium mb-4'>
                  3
                </div>
                <h3 className='font-semibold mb-2'>{t('home.howItWorks.step3Title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('home.howItWorks.step3Desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Simple Features */}
          <div className='mx-auto max-w-3xl mt-20 grid grid-cols-3 gap-8 text-center'>
            <div>
              <p className='text-2xl font-bold mb-1'>{t('home.stats.avgTime')}</p>
              <p className='text-sm text-muted-foreground'>{t('home.stats.avgTimeLabel')}</p>
            </div>
            <div>
              <p className='text-2xl font-bold mb-1'>{t('home.stats.freeForever')}</p>
              <p className='text-sm text-muted-foreground'>{t('home.stats.freeForeverLabel')}</p>
            </div>
            <div>
              <p className='text-2xl font-bold mb-1'>{t('home.stats.languages')}</p>
              <p className='text-sm text-muted-foreground'>{t('home.stats.languagesLabel')}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default IndexPage;
