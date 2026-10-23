import { describe, expect, it, vi } from "vitest";
import { LOGIN_METHOD } from "@theme/api/auth/signIn/constants";
import { resolveLoginOptionsMock } from "./loginOptionsMock";

// The latency only exists to make pending states visible in the browser; waiting it out here
// would add ~600 ms per test for nothing.
vi.mock("@theme/api/mocked/mockDelay", () => ({ MOCK_LATENCY_MS: 0, delay: () => Promise.resolve() }));

describe("resolveLoginOptionsMock", () => {
  it("offers the password method so the email step can hand over to the password step", async () => {
    const { methods } = await resolveLoginOptionsMock({ email: "finops.ffc@example.com" });

    expect(methods).toEqual([LOGIN_METHOD.PASSWORD]);
  });

  it("answers the same for every address, so the step cannot be used to probe for accounts", async () => {
    const known = await resolveLoginOptionsMock({ email: "finops.ffc@example.com" });
    const unknown = await resolveLoginOptionsMock({ email: "nobody@example.com" });

    expect(known).toEqual(unknown);
  });

  it("reports SSO as not configured until the auth service resolves it", async () => {
    const { sso } = await resolveLoginOptionsMock({ email: "finops.ffc@example.com" });

    expect(sso).toEqual({ state: "not_configured" });
  });
});
