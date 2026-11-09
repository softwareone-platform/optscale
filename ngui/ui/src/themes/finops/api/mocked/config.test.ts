import { describe, expect, it } from "vitest";
import { isMockedApiEnabled } from "./config";

describe("isMockedApiEnabled", () => {
  it("is on while the mfa_login flag is on and nothing opts out", () => {
    expect(isMockedApiEnabled({ mfaLogin: true })).toBe(true);
  });

  it("is off when mfa_login is off, so the legacy login never meets a mock", () => {
    expect(isMockedApiEnabled({ mfaLogin: false })).toBe(false);
    expect(isMockedApiEnabled({})).toBe(false);
  });

  it("lets VITE_MOCKED_API=false point the new UI at the real backend", () => {
    expect(isMockedApiEnabled({ mfaLogin: true, mockedApiEnv: "false" })).toBe(false);
  });
});
