import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, clearRateLimitStore } from "../rate-limit";

describe("rate-limit", () => {
  beforeEach(() => {
    clearRateLimitStore();
  });

  describe("checkRateLimit", () => {
    it("allows first request", () => {
      const config = { windowMs: 60_000, max: 5 };
      const result = checkRateLimit("test-key", config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it("decrements remaining on each request", () => {
      const config = { windowMs: 60_000, max: 5 };
      const r1 = checkRateLimit("test-key", config);
      expect(r1.allowed).toBe(true);
      expect(r1.remaining).toBe(4); // max - 1 (first request)

      const r2 = checkRateLimit("test-key", config);
      expect(r2.allowed).toBe(true);
      expect(r2.remaining).toBe(3);

      const r3 = checkRateLimit("test-key", config);
      expect(r3.allowed).toBe(true);
      expect(r3.remaining).toBe(2);
    });

    it("blocks request when limit reached", () => {
      const config = { windowMs: 60_000, max: 3 };
      for (let i = 0; i < 3; i++) {
        const result = checkRateLimit("test-key", config);
        expect(result.allowed).toBe(true);
      }
      const result = checkRateLimit("test-key", config);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it("uses separate keys", () => {
      const config = { windowMs: 60_000, max: 2 };
      checkRateLimit("key-1", config);
      checkRateLimit("key-1", config);
      const blocked = checkRateLimit("key-1", config);
      expect(blocked.allowed).toBe(false);

      const allowed = checkRateLimit("key-2", config);
      expect(allowed.allowed).toBe(true);
      expect(allowed.remaining).toBe(1);
    });

    it("resets after window expires", () => {
      const config = { windowMs: 100, max: 2 };
      checkRateLimit("test-key", config);
      checkRateLimit("test-key", config);
      const blocked = checkRateLimit("test-key", config);
      expect(blocked.allowed).toBe(false);

      // Wait for window to expire
      return new Promise((resolve) => setTimeout(resolve, 150)).then(() => {
        const result = checkRateLimit("test-key", config);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(1);
      });
    });

    it("returns resetMs", () => {
      const config = { windowMs: 60_000, max: 5 };
      const result = checkRateLimit("test-key", config);
      expect(result.resetMs).toBeGreaterThan(0);
      expect(result.resetMs).toBeLessThanOrEqual(config.windowMs);
    });
  });

  describe("clearRateLimitStore", () => {
    it("clears all entries", () => {
      const config = { windowMs: 60_000, max: 5 };
      checkRateLimit("key-1", config);
      checkRateLimit("key-2", config);
      clearRateLimitStore();
      const result = checkRateLimit("key-1", config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });
  });
});
