import { describe, expect, it } from "vitest";
import { MFA_CHALLENGE, MFA_ENROLLMENT, PROFILE } from "urls";
import { routes } from "./index";

describe("routes", () => {
  it("registers the MFA screens and the Profile page", () => {
    expect(routes.map(({ link }) => link)).toEqual(expect.arrayContaining([MFA_CHALLENGE, MFA_ENROLLMENT, PROFILE]));
  });
});
