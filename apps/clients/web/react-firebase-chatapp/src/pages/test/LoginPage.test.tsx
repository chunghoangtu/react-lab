import "@testing-library/jest-dom/vitest";
import { cleanup, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import LoginPage, { useFetchJson } from "@/pages/LoginPage";

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("pages.LoginPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders app title", () => {
    render(<LoginPage />);
    expect(screen.getByText("Fun Chat")).toBeInTheDocument();
  });

  it("renders app test title", () => {
    render(<LoginPage />);
    const testTitle = screen.getByTestId("test-title");
    expect(testTitle.textContent).toBe("Test Title");
  });

  it("renders Google Login Button", () => {
    render(<LoginPage />);
    expect(screen.getByText("Đăng nhập bằng Google")).toBeInTheDocument();
  });

  it("renders Facebook Login Button", () => {
    render(<LoginPage />);
    expect(screen.getByText("Đăng nhập bằng Facebook")).toBeInTheDocument();
  });

  it("renders Test Me Button with full functionality", async () => {
    render(<LoginPage />);
    expect(screen.getByText("Test Me")).toBeInTheDocument();

    const testButton = screen.getByRole("button", { name: /Test Me/ });
    const testValue = screen.getByTestId("test-value");

    expect(testValue.textContent).toEqual("");

    await userEvent.click(testButton);
    expect(testValue.textContent).toEqual("1, ");
    await userEvent.click(testButton);
    expect(testValue.textContent).toEqual("1, 1, ");
  });

  it("fetches and display user name", async () => {
    // vi.stubGlobal(
    //   "fetch",
    //   vi.fn(() =>
    //     Promise.resolve({
    //       json: async () => ({ name: "Leanne Graham" }),
    //     })
    //   )
    // );

    render(<LoginPage />);
    await waitFor(() => {
      const testJson = screen.getByTestId("test-json");
      expect(testJson.textContent).toEqual("Leanne Graham");
    });
    expect(await screen.findByTestId("test-json")).toHaveTextContent("Leanne Graham");
  });

  test("useFetchJson init value is setJson", async () => {
    const setJson = vi.fn();
    const { result } = renderHook(() => useFetchJson(setJson));
    expect(result.current.cb).toBe(setJson);

    act(() => {
      result.current.setNumber("test");
    });

    expect(result.current.number).toBe("test");
  });

  test("test custom api", () => {
    render(<LoginPage />);
  });
});
