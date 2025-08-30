import { createFileRoute } from '@tanstack/react-router';
import { TemplatePage } from '@/pages/template-page';

export const Route = createFileRoute('/templates/$templateId')({
  component: TemplatePage,
});