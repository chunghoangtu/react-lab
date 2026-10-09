import { getRouteApi } from "@tanstack/react-router";

const Route = getRouteApi("/post/$postId");

export default function PostDetails() {
  const { postId: PostIdParams } = Route.useParams();
  const { postId, title, body } = Route.useLoaderData();

  return (
    <div>
      Post {PostIdParams} Details:
      <h3>ID: {postId}</h3>
      <h3>Title: {title}</h3>
      <h3>Body: {body}</h3>
    </div>
  );
}
