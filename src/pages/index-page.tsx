import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    ClipboardList,
    Download,
    Edit3,
    Eye,
    FileDown,
    Globe,
    Layout,
    Moon,
    Palette,
    Save,
    Shield,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';

const FloatingCvMockup = () => (
    <div className="animate-float relative" aria-hidden="true">
        {/* CV Document */}
        <div className="relative w-64 rounded-lg border border-white/20 bg-white p-6 shadow-2xl sm:w-72 lg:w-80 dark:border-white/10 dark:bg-white">
            {/* Header bar */}
            <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
                <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 w-24 rounded-full bg-slate-800" />
                    <div className="h-2 w-16 rounded-full bg-slate-400" />
                </div>
            </div>
            {/* Section bars */}
            <div className="mb-3 h-2 w-20 rounded-full bg-indigo-500/70" />
            <div className="mb-1.5 h-1.5 w-full rounded-full bg-slate-200" />
            <div className="mb-1.5 h-1.5 w-11/12 rounded-full bg-slate-200" />
            <div className="mb-4 h-1.5 w-3/4 rounded-full bg-slate-200" />
            <div className="mb-3 h-2 w-16 rounded-full bg-indigo-500/70" />
            <div className="mb-1.5 h-1.5 w-full rounded-full bg-slate-200" />
            <div className="mb-1.5 h-1.5 w-10/12 rounded-full bg-slate-200" />
            <div className="mb-4 h-1.5 w-2/3 rounded-full bg-slate-200" />
            <div className="mb-3 h-2 w-14 rounded-full bg-indigo-500/70" />
            <div className="flex gap-2">
                <div className="h-5 w-14 rounded-full bg-slate-100" />
                <div className="h-5 w-12 rounded-full bg-slate-100" />
                <div className="h-5 w-16 rounded-full bg-slate-100" />
            </div>
        </div>
        {/* Decorative glow behind the mockup */}
        <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-2xl" />
    </div>
);

const GeometricShapes = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-left triangle */}
        <div className="animate-float-reverse absolute top-20 left-[8%] h-16 w-16 rotate-12 border-2 border-indigo-500/15 dark:border-indigo-400/10" />
        {/* Top-right circle */}
        <div className="animate-float absolute top-32 right-[12%] h-20 w-20 rounded-full border-2 border-violet-500/10 dark:border-violet-400/8" />
        {/* Bottom-left dot cluster */}
        <div className="absolute bottom-40 left-[15%] grid grid-cols-3 gap-1.5 opacity-20 dark:opacity-10">
            {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            ))}
        </div>
        {/* Mid-right line */}
        <div className="animate-float absolute right-[5%] top-1/2 h-px w-24 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        {/* Bottom-right square */}
        <div className="animate-float-reverse absolute right-[18%] bottom-24 h-12 w-12 rotate-45 rounded-sm border-2 border-indigo-500/10 dark:border-indigo-400/8" />
    </div>
);

export const IndexPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Language and Theme Toggle */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[90vh] overflow-hidden">
                {/* Background gradient mesh */}
                <div className="animate-gradient-shift absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/80" />

                {/* Dot grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <GeometricShapes />

                <div className="relative z-10 container mx-auto flex min-h-[90vh] items-center px-4 py-20">
                    <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left: Text Content */}
                        <div className="max-w-2xl">
                            <h1
                                className="animate-blur-in mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
                                style={{ fontFamily: 'Syne, sans-serif' }}
                            >
                                {t('home.hero.title')}{' '}
                                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
                                    {t('home.hero.titleHighlight')}
                                </span>
                            </h1>
                            <p className="animate-fade-in-up text-muted-foreground mb-10 max-w-lg text-lg delay-1 sm:text-xl">
                                {t('home.hero.subtitle')}
                            </p>
                            <div className="animate-fade-in-up flex flex-wrap gap-4 delay-2">
                                <Link to="/builder">
                                    <Button
                                        size="lg"
                                        className="animate-pulse-glow group h-12 cursor-pointer rounded-xl px-8 text-base"
                                    >
                                        <Edit3 className="mr-2 h-5 w-5" />
                                        {t('home.hero.cta')}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link to="/templates">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="hover-lift group h-12 cursor-pointer rounded-xl px-8 text-base"
                                    >
                                        <Eye className="mr-2 h-5 w-5" />
                                        {t('home.hero.ctaSecondary')}
                                    </Button>
                                </Link>
                            </div>
                            {/* Trust badges */}
                            <div className="animate-fade-in-up text-muted-foreground mt-10 flex flex-wrap items-center gap-6 text-sm delay-3">
                                <span className="flex items-center gap-2">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {t('home.features.noSignup')}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {t('home.features.free')}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {t('home.features.exportPdf')}
                                </span>
                            </div>
                        </div>

                        {/* Right: Floating CV Mockup */}
                        <div className="animate-fade-in-scale hidden justify-center delay-3 lg:flex">
                            <FloatingCvMockup />
                        </div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className="relative bg-white py-24 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="animate-fade-in-up mx-auto mb-16 max-w-2xl text-center">
                        <h2
                            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                            {t('home.features.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('home.features.subtitle')}
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {(
                            [
                                {
                                    icon: Layout,
                                    key: 'templates' as const,
                                    gradient: 'from-indigo-500 to-blue-600',
                                },
                                {
                                    icon: Moon,
                                    key: 'darkMode' as const,
                                    gradient: 'from-violet-500 to-purple-600',
                                },
                                {
                                    icon: Download,
                                    key: 'pdf' as const,
                                    gradient: 'from-cyan-500 to-blue-600',
                                },
                                {
                                    icon: Globe,
                                    key: 'i18n' as const,
                                    gradient: 'from-emerald-500 to-teal-600',
                                },
                                {
                                    icon: Save,
                                    key: 'autosave' as const,
                                    gradient: 'from-amber-500 to-orange-600',
                                },
                                {
                                    icon: Shield,
                                    key: 'privacy' as const,
                                    gradient: 'from-rose-500 to-pink-600',
                                },
                            ] as const
                        ).map(({ icon: Icon, key, gradient }, i) => (
                            <div
                                key={key}
                                className={`animate-fade-in-up group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200/60 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-500/20 dark:hover:shadow-indigo-500/5 delay-${i + 1}`}
                            >
                                {/* Hover gradient glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/0 to-violet-50/0 transition-colors duration-300 group-hover:from-indigo-50/50 group-hover:to-violet-50/30 dark:group-hover:from-indigo-500/5 dark:group-hover:to-violet-500/5" />
                                <div className="relative">
                                    <div
                                        className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${gradient} p-2.5 text-white shadow-lg`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        {t(`home.features.${key}.title`)}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {t(`home.features.${key}.desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS SECTION ===== */}
            <section className="relative overflow-hidden bg-slate-50/50 py-24 dark:bg-slate-900/50">
                {/* Subtle background texture */}
                <div
                    className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                <div className="relative container mx-auto px-4">
                    <div className="animate-fade-in-up mx-auto mb-20 max-w-2xl text-center">
                        <h2
                            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                            {t('home.howItWorks.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('home.howItWorks.subtitle')}
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl">
                        <div className="relative grid gap-8 md:grid-cols-3 md:gap-12">
                            {/* Animated connector line (desktop) */}
                            <div className="animate-draw-line absolute top-14 left-[calc(16.67%+24px)] hidden h-0.5 w-[calc(66.66%-48px)] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 delay-3 md:block" />

                            {(
                                [
                                    {
                                        icon: Palette,
                                        step: 1,
                                        titleKey: 'step1Title',
                                        descKey: 'step1Desc',
                                        gradient: 'from-indigo-500 to-blue-600',
                                    },
                                    {
                                        icon: ClipboardList,
                                        step: 2,
                                        titleKey: 'step2Title',
                                        descKey: 'step2Desc',
                                        gradient: 'from-violet-500 to-purple-600',
                                    },
                                    {
                                        icon: FileDown,
                                        step: 3,
                                        titleKey: 'step3Title',
                                        descKey: 'step3Desc',
                                        gradient: 'from-purple-500 to-pink-600',
                                    },
                                ] as const
                            ).map(({ icon: Icon, step, titleKey, descKey, gradient }, i) => (
                                <div
                                    key={step}
                                    className={`animate-fade-in-up text-center delay-${i + 1}`}
                                >
                                    {/* Step circle with icon */}
                                    <div className="relative mx-auto mb-6">
                                        <div
                                            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        {/* Step number badge */}
                                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 shadow-md dark:bg-slate-800 dark:text-slate-200">
                                            {step}
                                        </span>
                                    </div>
                                    <h3
                                        className="mb-2 text-lg font-semibold"
                                        style={{ fontFamily: 'Syne, sans-serif' }}
                                    >
                                        {t(`home.howItWorks.${titleKey}`)}
                                    </h3>
                                    <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed">
                                        {t(`home.howItWorks.${descKey}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TEMPLATE SHOWCASE ===== */}
            <section className="relative bg-white py-24 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="animate-fade-in-up mx-auto mb-16 max-w-2xl text-center">
                        <h2
                            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                            {t('home.templateShowcase.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('home.templateShowcase.subtitle')}
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
                        {(
                            [
                                {
                                    id: 'developer',
                                    font: 'JetBrains Mono',
                                    color: 'from-violet-500 to-indigo-600',
                                    accentBar: 'bg-violet-500',
                                },
                                {
                                    id: 'default',
                                    font: 'Montserrat',
                                    color: 'from-slate-500 to-gray-700',
                                    accentBar: 'bg-slate-500',
                                },
                                {
                                    id: 'veterinary',
                                    font: 'Lato',
                                    color: 'from-emerald-500 to-teal-600',
                                    accentBar: 'bg-emerald-500',
                                },
                            ] as const
                        ).map(({ id, font, color, accentBar }, i) => (
                            <Link
                                key={id}
                                to="/templates/$templateId"
                                params={{ templateId: id }}
                                className={`animate-fade-in-up group delay-${i + 1}`}
                            >
                                <div className="hover-lift relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white transition-all duration-300 hover:border-indigo-200/60 hover:shadow-xl dark:border-white/5 dark:bg-slate-900/50 dark:hover:border-indigo-500/20">
                                    {/* Template mini preview */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 p-4 dark:bg-slate-800/50">
                                        {/* Accent bar */}
                                        <div
                                            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${color}`}
                                        />
                                        {/* Skeleton CV */}
                                        <div className="mx-auto w-full max-w-[140px] rounded bg-white p-3 shadow-sm dark:bg-white">
                                            <div className="mb-2 flex items-center gap-2">
                                                <div
                                                    className={`h-5 w-5 rounded-full bg-gradient-to-br ${color}`}
                                                />
                                                <div className="space-y-1">
                                                    <div className="h-1.5 w-12 rounded-full bg-slate-700" />
                                                    <div className="h-1 w-8 rounded-full bg-slate-400" />
                                                </div>
                                            </div>
                                            <div
                                                className={`mb-1.5 h-1 w-10 rounded-full ${accentBar}/60`}
                                            />
                                            <div className="mb-0.5 h-0.5 w-full rounded-full bg-slate-200" />
                                            <div className="mb-0.5 h-0.5 w-11/12 rounded-full bg-slate-200" />
                                            <div className="mb-2 h-0.5 w-3/4 rounded-full bg-slate-200" />
                                            <div
                                                className={`mb-1.5 h-1 w-8 rounded-full ${accentBar}/60`}
                                            />
                                            <div className="mb-0.5 h-0.5 w-full rounded-full bg-slate-200" />
                                            <div className="mb-0.5 h-0.5 w-10/12 rounded-full bg-slate-200" />
                                            <div className="h-0.5 w-2/3 rounded-full bg-slate-200" />
                                        </div>
                                    </div>
                                    {/* Template info */}
                                    <div className="p-4">
                                        <h3 className="mb-1 font-semibold">
                                            {t(`templates.${id}.name`)}
                                        </h3>
                                        <p
                                            className="text-muted-foreground text-xs"
                                            style={{ fontFamily: font }}
                                        >
                                            {font}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="animate-fade-in-up mt-12 text-center delay-4">
                        <Link to="/templates">
                            <Button
                                variant="outline"
                                size="lg"
                                className="hover-lift group rounded-xl"
                            >
                                {t('home.templateShowcase.cta')}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IndexPage;
