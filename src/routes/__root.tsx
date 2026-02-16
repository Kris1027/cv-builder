import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/contexts/theme-context';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme='system'>
      <div className='min-h-screen bg-background text-foreground transition-colors root-transition'>
        <main className='flex-1'>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
