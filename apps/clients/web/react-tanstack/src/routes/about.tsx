import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/features/about/pages";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
