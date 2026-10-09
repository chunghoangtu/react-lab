import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className='flex gap-3 bg-cyan-700 p-2 text-cyan-100 shadow-lg shadow-cyan-800'>
      <Link
        to='/'
        className='[&.active]:font-bold'
      >
        Home
      </Link>
      <Link
        to='/about'
        className='[&.active]:font-bold'
      >
        About
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
