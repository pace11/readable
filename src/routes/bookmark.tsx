import { createFileRoute } from '@tanstack/react-router'
import BookmarkContainer from '@/pages/bookmark-container'

export const Route = createFileRoute('/bookmark')({
  component: BookmarkContainer,
})
