import { Link, useNavigate } from "@tanstack/react-router";

export default function PostPage() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-start gap-3 p-5'>
      Post
      <Link
        to='/posts/$postId'
        params={{ postId: "1" }}
        search={{
          userId: 1,
        }}
      >
        Post 1
      </Link>
      <button onClick={() => navigate({ to: "/about" })}>Go to About</button>
    </div>
  );
}
