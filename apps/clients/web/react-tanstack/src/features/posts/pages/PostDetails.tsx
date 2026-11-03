import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi("/posts/$postId");

export default function PostDetails() {
  const { postId: PostIdParams } = route.useParams();
  const { id: postId, title, body } = route.useLoaderData();
  const { userId } = route.useSearch();

  return (
    <div>
      Post {PostIdParams} Details:
      <h3>ID: {postId}</h3>
      <h3>User: {userId}</h3>
      <h3>Title: {title}</h3>
      <h3>Body: {body}</h3>
    </div>
  );
}
