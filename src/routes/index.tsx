import { createFileRoute } from '@tanstack/react-router'
import HomeContainer from '@/pages/home-container'

export const Route = createFileRoute('/')({
  component: HomeContainer,
})
