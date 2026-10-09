import { createFileRoute } from "@tanstack/react-router";
import { PostDetails } from "@/features/post/pages";

export const Route = createFileRoute("/post/$postId")({
  component: PostDetails,
  loader: () => {
    return { postId: "1", title: "Post 1", body: "This is post 1" };
  },
});
