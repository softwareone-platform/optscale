import { afterEach, describe, expect, it, vi } from "vitest";
import { MFA_CHALLENGE, MFA_ENROLLMENT, PROFILE } from "urls";

const loadRouteLinks = async (mfaLogin: boolean) => {
  vi.resetModules();
  vi.doMock("utils/mfaLogin", () => ({ IS_MFA_LOGIN_ENABLED: mfaLogin }));

  const { routes } = await import("./index");

  return routes.map(({ link }) => link);
};

// A fresh import of the whole routes module takes a few seconds under a full run.
const IMPORT_TIMEOUT_MS = 20_000;

describe("routes", () => {
  afterEach(() => {
    vi.doUnmock("utils/mfaLogin");
  });

  it(
    "registers the MFA screens and the Profile page while mfa_login is on",
    async () => {
      expect(await loadRouteLinks(true)).toEqual(expect.arrayContaining([MFA_CHALLENGE, MFA_ENROLLMENT, PROFILE]));
    },
    IMPORT_TIMEOUT_MS
  );

  it(
    "leaves them out while mfa_login is off, so the app is upstream's",
    async () => {
      const links = await loadRouteLinks(false);

      expect(links).not.toContain(MFA_CHALLENGE);
      expect(links).not.toContain(MFA_ENROLLMENT);
      expect(links).not.toContain(PROFILE);
    },
    IMPORT_TIMEOUT_MS
  );
});
