import { createFileRoute } from '@tanstack/react-router'
import { BuildFormPage } from '../pages/build-form-page'

export const Route = createFileRoute('/build-form')({
  component: BuildFormPage,
})