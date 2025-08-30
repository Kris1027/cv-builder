import { createFileRoute } from '@tanstack/react-router';
import { TemplatesPage } from '@/pages/templates-page';

export const Route = createFileRoute('/templates')({
  component: TemplatesPage,
});