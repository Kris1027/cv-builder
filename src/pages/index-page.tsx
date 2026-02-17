import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Edit3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';

export const IndexPage = () => {
    const { t } = useTranslation();

    return (
        <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
            {/* Language and Theme Toggle */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="animate-blur-in mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                        {t('home.hero.title')}{' '}
                        <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                            {t('home.hero.titleHighlight')}
                        </span>
                    </h1>
                    <p className="animate-fade-in-up text-muted-foreground mb-10 text-xl delay-1">
                        {t('home.hero.subtitle')}
                    </p>
                    <div className="animate-fade-in-up flex justify-center delay-2">
                        <Link to="/templates">
                            <Button size="lg" className="group hover-lift">
                                <Edit3 className="mr-2 h-5 w-5" />
                                {t('home.hero.cta')}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                    <div className="animate-fade-in-up text-muted-foreground mt-12 flex items-center justify-center gap-8 text-sm delay-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>{t('home.features.noSignup')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>{t('home.features.free')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>{t('home.features.exportPdf')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="animate-fade-in-up mx-auto mb-16 max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold">{t('home.howItWorks.title')}</h2>
                        <p className="text-muted-foreground">{t('home.howItWorks.subtitle')}</p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-4">
                            {/* Step 1 */}
                            <div className="animate-fade-in-up relative flex-1 text-center delay-1">
                                <div className="bg-muted mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
                                    1
                                </div>
                                <h3 className="mb-2 font-semibold">
                                    {t('home.howItWorks.step1Title')}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {t('home.howItWorks.step1Desc')}
                                </p>
                                {/* Connector Line for desktop */}
                                <div className="bg-border absolute top-5 left-[calc(50%+20px)] hidden h-px w-[calc(100%-40px)] md:block" />
                            </div>

                            {/* Step 2 */}
                            <div className="animate-fade-in-up relative flex-1 text-center delay-2">
                                <div className="bg-muted mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
                                    2
                                </div>
                                <h3 className="mb-2 font-semibold">
                                    {t('home.howItWorks.step2Title')}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {t('home.howItWorks.step2Desc')}
                                </p>
                                {/* Connector Line for desktop */}
                                <div className="bg-border absolute top-5 left-[calc(50%+20px)] hidden h-px w-[calc(100%-40px)] md:block" />
                            </div>

                            {/* Step 3 */}
                            <div className="animate-fade-in-up flex-1 text-center delay-3">
                                <div className="bg-muted mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
                                    3
                                </div>
                                <h3 className="mb-2 font-semibold">
                                    {t('home.howItWorks.step3Title')}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {t('home.howItWorks.step3Desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Simple Features */}
                    <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-8 text-center">
                        <div className="animate-fade-in-scale delay-1">
                            <p className="mb-1 text-2xl font-bold">{t('home.stats.avgTime')}</p>
                            <p className="text-muted-foreground text-sm">
                                {t('home.stats.avgTimeLabel')}
                            </p>
                        </div>
                        <div className="animate-fade-in-scale delay-2">
                            <p className="mb-1 text-2xl font-bold">{t('home.stats.freeForever')}</p>
                            <p className="text-muted-foreground text-sm">
                                {t('home.stats.freeForeverLabel')}
                            </p>
                        </div>
                        <div className="animate-fade-in-scale delay-3">
                            <p className="mb-1 text-2xl font-bold">{t('home.stats.languages')}</p>
                            <p className="text-muted-foreground text-sm">
                                {t('home.stats.languagesLabel')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IndexPage;
