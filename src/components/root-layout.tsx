import { HeadContent, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/theme-context';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { PrivacyNotice } from '@/components/privacy-notice';
import { useTranslation } from 'react-i18next';

export const RootLayout = () => {
    const { t } = useTranslation();

    return (
        <>
            <HeadContent />
            <ThemeProvider defaultTheme='system'>
                <a
                    href='#main-content'
                    className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring'
                >
                    {t('accessibility.skipToContent')}
                </a>
                <div className='bg-background text-foreground min-h-screen transition-colors'>
                    <main id='main-content' className='flex-1'>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </main>
                </div>
                <PrivacyNotice />
            </ThemeProvider>
        </>
    );
};
