import { Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/theme-context';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export const RootLayout = () => {
    return (
        <ThemeProvider defaultTheme='system'>
            <div className='bg-background text-foreground min-h-screen transition-colors'>
                <main className='flex-1'>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </main>
            </div>
        </ThemeProvider>
    );
};
