import { Link, useNavigate } from "@tanstack/react-router";

export default function PostPage() {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-start gap-3 p-5'>
      Post
      <button onClick={() => navigate({ to: "/about" })}>Go to About</button>
      <Link
        to='/post/$postId'
        params={{ postId: "1" }}
      >
        Post 1
      </Link>
    </div>
  );
}
