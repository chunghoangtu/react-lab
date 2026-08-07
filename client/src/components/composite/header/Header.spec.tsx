import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

vi.mock("@tanstack/react-router", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("Header", () => {
  it("Render Header without error!", () => {
    render(<Header />);
    expect(screen.getByText("React collection")).toBeInTheDocument();
  });
});
