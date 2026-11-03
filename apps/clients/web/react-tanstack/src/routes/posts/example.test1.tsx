import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/example/test1')({
  staticData: { breadcrumb: "/posts/example/test1" },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/example/test1"!</div>
}
