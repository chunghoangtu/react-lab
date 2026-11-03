import { createFileRoute, useRouter } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "@/utils";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [isAuthen, setIsAuthen] = useState(isAuthenticated);

  return (
    <>
      <h2>Login</h2>
      {isAuthen ? (
        <>
          <p>Hello user!</p>
          <button
            onClick={async () => {
              signOut();
              setIsAuthen(false);
              router.invalidate();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={async () => {
            signIn();
            setIsAuthen(true);
            router.invalidate();
          }}
        >
          Sign in
        </button>
      )}
    </>
  );
}
