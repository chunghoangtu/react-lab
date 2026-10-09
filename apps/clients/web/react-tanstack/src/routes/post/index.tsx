import { createFileRoute } from '@tanstack/react-router'
import { PostPage } from '@/features/post/pages'

export const Route = createFileRoute('/post/')({
  component: PostPage,
})
