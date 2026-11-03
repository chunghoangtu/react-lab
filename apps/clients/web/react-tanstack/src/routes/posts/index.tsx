import { PostPage } from "@/features/posts/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  staticData: { breadcrumb: "Posts" },
  component: PostPage,
});
