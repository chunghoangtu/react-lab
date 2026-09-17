import { createFileRoute, redirect } from "@tanstack/react-router";

import LoginPage from "@/pages/LoginPage";
import { waitForAuthState } from "@/services/auth.service";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    if (await waitForAuthState()) {
      throw redirect({ to: "/chatroom" });
    }
  },
  component: LoginPage,
});
