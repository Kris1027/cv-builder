import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/theme-context';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <ThemeProvider defaultTheme="system">
            <div className="bg-background text-foreground root-transition min-h-screen transition-colors">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    );
}
