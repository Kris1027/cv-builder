import { createFileRoute } from '@tanstack/react-router'
import { PreviewPage } from '../pages/preview-page'

export const Route = createFileRoute('/preview')({
  component: PreviewPage,
})