import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Welcome from "./pages/Welcome";
import enCommon from "@/i18n//locales/en/common.json" with { type: "json" };

describe("Header", () => {
  it("Render Welcome without error!", async () => {
    render(<Welcome />);
    expect(screen.getByText(enCommon.welcome)).toBeInTheDocument();
  });
});
