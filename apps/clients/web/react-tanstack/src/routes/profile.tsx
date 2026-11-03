import { createFileRoute, redirect, useBlocker } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  staticData: { breadcrumb: "Profile" },
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;

    if (!isLogged())
      throw redirect({
        to: "/login",
      });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");

  // useBlocker({
  //   shouldBlockFn: () => !!name && !window.confirm("Are you sure you want to leave?"),
  // });
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => !!name,
    withResolver: true,
  });

  return (
    <div>
      Hello "/profile"!
      <input
        className='ml-5 w-50 rounded-xl border'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {status === "blocked" ? (
        // we can replace this with modal, like shadcnUI Alert
        <div>
          Are you sure you want to leave?
          <div className='flex gap-3'>
            <button onClick={proceed}>Yes</button>
            <button onClick={reset}>No</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
