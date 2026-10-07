import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    {/* <div className='p-2 flex gap-2 bg-cyan-700 text-cyan-100'>
      <Link
        to='/'
        className='[&.active]:font-bold'
      >
        Home
      </Link>{" "}
    </div> */}
    <hr />
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({ component: RootLayout });
