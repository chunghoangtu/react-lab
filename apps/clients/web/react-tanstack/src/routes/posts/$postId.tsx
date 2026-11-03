import { createFileRoute } from "@tanstack/react-router";
import { PostDetails } from "@/features/posts/pages";

const POSTS: Post[] = [
  {
    id: 1,
    userId: 1,
    title: "Post 1",
    body: "This is post 1",
  },
];

export const Route = createFileRoute("/posts/$postId")({
  staticData: { breadcrumb: (match) => `#${match.params.postId}` },
  component: PostDetails,
  validateSearch: (search) => {
    return {
      userId: (search.userId as number) || "",
    };
  },
  loaderDeps: ({ search: { userId } }) => {
    return {
      userId,
    };
  },
  loader: async ({ params, deps: { userId } }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Lets assume that we are gonna all adn API to fetch post details
    return POSTS.find((post) => post.id === +params.postId) as Post;
  },
  pendingMs: 200,
  pendingComponent: () => <div>Loading Post ...</div>,
  errorComponent: () => <div>Error!</div>,
});
