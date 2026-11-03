import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(hidden-routes)/layouts/_hiddenLayout/bar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(hidden-routes)/_hiddenLayout/bar"!</div>
}
