import { createFileRoute, redirect } from '@tanstack/react-router'
import Dashboard from '../../pages/Dashboard'

export const Route = createFileRoute('/_auth/')({
  component: Dashboard,
})
