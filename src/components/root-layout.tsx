import { Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/theme-context';

export const RootLayout = () => {
    return (
        <ThemeProvider defaultTheme="system">
            <div className="bg-background text-foreground root-transition min-h-screen transition-colors">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    );
};
