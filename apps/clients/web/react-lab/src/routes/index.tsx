import { createFileRoute } from "@tanstack/react-router";
import Welcome from "@features/welcome/pages/Welcome";

export const Route = createFileRoute("/")({
  component: Welcome,
});
