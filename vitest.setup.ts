import { vi, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend vitest expect with testing-library matchers
expect.extend(matchers);

declare module "vitest" {
  interface Assertion {
    toHaveClass: (className: string) => void;
    toBeInTheDocument: () => void;
    toBeVisible: () => void;
    toHaveTextContent: (text: string) => void;
  }
}

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
