import { createFileRoute } from '@tanstack/react-router'
import BookmarkContainer from '@/containers/bookmark.container'

export const Route = createFileRoute('/bookmark')({
  component: BookmarkContainer,
})
