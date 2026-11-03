import { Breadcrumbs } from "@/components";
import Header from "@/components/Header";
import type { AuthContext } from "@/hooks/useAuth";
import { RouterDevtools } from "@/libs/devtools/router-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type RouterContext = {
  authentication: AuthContext;
};

const RootLayout = () => (
  <>
    <Header />
    <Breadcrumbs />
    <hr />
    <main className='p-7'>
      <Outlet />
    </main>
    <RouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
