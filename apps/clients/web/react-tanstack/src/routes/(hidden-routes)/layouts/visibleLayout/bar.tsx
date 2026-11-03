import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(hidden-routes)/layouts/visibleLayout/bar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(hidden-routes)/visibleLayout/bar"!</div>
}
