import { afterEach, describe, expect, it } from "vitest";
import { resetMockState } from "./mockState";
import { findRealSession, forgetRealSession, getRealSessionStatus, storeRealSession } from "./realSession";

const SESSION = { token: "MDAxY-real", user_id: "9c2a", user_email: "reto.mayer@example.com" };

describe("the captured real session", () => {
  afterEach(resetMockState);

  it("hands the stored token back to the mocked sign-in", () => {
    storeRealSession(SESSION, 1_758_480_000);

    expect(findRealSession()).toMatchObject(SESSION);
  });

  it("tells the dev panel who and when, but never the token", () => {
    storeRealSession(SESSION, 1_758_480_000);

    expect(getRealSessionStatus()).toEqual({
      session: { user_id: "9c2a", user_email: "reto.mayer@example.com", captured_at: 1_758_480_000 }
    });
  });

  it("is gone once forgotten", () => {
    storeRealSession(SESSION);

    forgetRealSession();

    expect(findRealSession()).toBeNull();
    expect(getRealSessionStatus()).toEqual({ session: null });
  });
});
