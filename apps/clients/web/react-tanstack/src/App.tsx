// Import the generated route tree
import type { BreadcrumbValue } from "@/components/Breadcrumbs";
import { useAuth } from "@/hooks/useAuth";
import { routeTree } from "@/routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouteMask, createRouter, Link, RouterProvider } from "@tanstack/react-router";

const stepsMask = createRouteMask({
  routeTree,
  from: "/steps",
  to: "/steps",
  search: (prev) => ({ ...prev, step: undefined }),
});

// Create a query client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Global Not found!</p>
        <Link to='/'>Go home</Link>
      </div>
    );
  },
  routeMasks: [stepsMask],
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption {
    breadcrumb?: BreadcrumbValue
  }
}

export default function App() {
  const auth = useAuth();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          context={{ authentication: auth }}
        />
      </QueryClientProvider>
    </>
  );
}
