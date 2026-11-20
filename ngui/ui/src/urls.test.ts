import { describe, expect, it } from "vitest";
import { getEmailVerificationUrl, getLoginUrl } from "./urls";

describe("getLoginUrl", () => {
  it("opens the login page with the address filled in", () => {
    expect(getLoginUrl("finops.ffc@example.com")).toBe("/login?email=finops.ffc%40example.com");
  });
});

describe("getEmailVerificationUrl", () => {
  it("carries only the address when there is no capability", () => {
    expect(getEmailVerificationUrl("finops.ffc@example.com")).toBe("/email-verification?email=finops.ffc%40example.com");
  });

  it("carries the capability after the address", () => {
    expect(getEmailVerificationUrl("finops.ffc@example.com", "finops")).toBe(
      "/email-verification?email=finops.ffc%40example.com&capability=finops"
    );
  });
});
