import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { server } from "./src/mocks/server";

const createMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => createMatchMedia(query)),
});

// Object.defineProperty(globalThis, "matchMedia", {
//   writable: true,
//   value: window.matchMedia,
// });

// class ResizeObserverMock {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

// Object.defineProperty(window, "ResizeObserver", {
//   writable: true,
//   value: ResizeObserverMock,
// });

// Object.defineProperty(globalThis, "ResizeObserver", {
//   writable: true,
//   value: ResizeObserverMock,
// });

// Integrate with Mock Server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
