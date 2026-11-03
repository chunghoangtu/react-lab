import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(hidden-routes)/layouts/visibleLayout/foo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(hidden-routes)/visibleLayout/foo"!</div>
}
