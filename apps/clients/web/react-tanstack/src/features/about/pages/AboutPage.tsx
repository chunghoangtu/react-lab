import { useNavigate } from "@tanstack/react-router";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div>
      About
      <button className="custom-button" onClick={() => navigate({ to: "/posts" })}>Go to Post</button>
    </div>
  );
}
