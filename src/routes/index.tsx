import { createFileRoute } from '@tanstack/react-router'
import HomeContainer from '../containers/home.container'

export const Route = createFileRoute('/')({
  component: HomeContainer,
})
