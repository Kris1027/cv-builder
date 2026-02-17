import BuilderPage from '@/pages/builder-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/builder')({
    component: RouteComponent,
});

function RouteComponent() {
    const { templateId } = Route.useSearch() as { templateId?: string };
    return <BuilderPage templateId={templateId} />;
}
