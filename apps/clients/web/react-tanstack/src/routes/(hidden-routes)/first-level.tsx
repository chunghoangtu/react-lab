import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(hidden-routes)/first-level')({
  staticData: { breadcrumb: "First-level" },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(hidden-routes)/first-level"!</div>
}
