import BuilderPage from '@/pages/builder-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/builder')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BuilderPage />;
}
