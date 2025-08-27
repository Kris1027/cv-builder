import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { NavigationBar } from '@/components/navigation-bar';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <NavigationBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </React.Fragment>
  );
}
