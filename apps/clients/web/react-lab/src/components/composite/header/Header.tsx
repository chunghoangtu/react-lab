import { LanguageSelector } from "@components/composite/language-selector";
import { ThemeToggle } from "@components/composite/theme-toggle";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <div className="border-b border-border bg-muted/40 backdrop-blur flex justify- items-center gap-4 p-3">
      <h2>React collection</h2>
      <div className="flex-1">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <ThemeToggle />
      <LanguageSelector />
    </div>
  );
}
