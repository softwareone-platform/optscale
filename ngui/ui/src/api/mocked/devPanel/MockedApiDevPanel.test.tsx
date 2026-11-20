import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CREATE_TOKEN_STATUS } from "api/auth/signIn";
import { LoginChallenge } from "api/auth/signIn/types";
import { SECURITY_SCENARIO, SECURITY_SCENARIO_INFO } from "api/mocked/auth/mfaMethods/scenarios";
import { SIGN_IN_SCENARIO, SIGN_IN_SCENARIO_INFO } from "api/mocked/auth/signIn/scenarios";
import { MOCK_SIGN_IN_CREDENTIALS, SECURITY_SCENARIO_COOKIE, SIGN_IN_SCENARIO_COOKIE } from "api/mocked/config";
import { readSecurityScenarioCookie, readSignInScenarioCookie } from "api/mocked/http/scenarioCookies";
import MfaChallengeStep from "components/MfaChallengeStep";
import { SignInRouterState } from "hooks/useLoginChallenge";
import { renderWithProviders } from "tests/renderWithProviders";
import { EMAIL_METHOD, MFA_REQUIRED_CHALLENGE, TOTP_METHOD } from "tests/signInFixtures";
import { MFA_CHALLENGE, LOGIN } from "urls";
import MockedApiDevPanel from "./MockedApiDevPanel";

const noDefaultChallenge: LoginChallenge = {
  ...MFA_REQUIRED_CHALLENGE,
  challenge_id: "7e3a5d1f-4c2b-4c8f-8e2f-1a5d3b7c9f02",
  methods: [{ ...TOTP_METHOD, is_default: false }, EMAIL_METHOD],
  default_method_id: null
};

const createTokenSpy = vi.fn();

// The transport is the boundary: the panel's own routing and the MFA screen stay real.
vi.mock("api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params)
}));
// The real-session section asks the dev server on mount; RealSessionSection.test.tsx covers what it does.
vi.mock("api/auth/request", () => ({
  requestAuth: () => Promise.resolve({ status: 200, data: { session: null } }),
  postAuth: vi.fn()
}));

const renderAt = (initialEntry: { pathname: string; state?: SignInRouterState }) => {
  const { container, find, text, unmount } = renderWithProviders({
    initialEntry,
    routes: (
      <>
        <Route
          path={MFA_CHALLENGE}
          element={
            <>
              <MfaChallengeStep />
              <MockedApiDevPanel />
            </>
          }
        />
        <Route path={LOGIN} element={<MockedApiDevPanel />} />
      </>
    )
  });

  return {
    find,
    text,
    selectScenario: (scenario: string, selectId = "mocked_api_dev_panel_scenario") =>
      act(() => {
        const select = container.querySelector<HTMLSelectElement>(`#${selectId}`)!;
        select.value = scenario;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }),
    unmount
  };
};

describe("MockedApiDevPanel", () => {
  afterEach(() => {
    [SIGN_IN_SCENARIO_COOKIE, SECURITY_SCENARIO_COOKIE].forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0`;
    });
    createTokenSpy.mockReset();
  });

  it("marks no scenario in progress and adds no status line now that each leads to a finished screen", () => {
    const panel = renderAt({ pathname: LOGIN });
    const options = Array.from(
      document.querySelectorAll("#mocked_api_dev_panel_scenario option"),
      (option) => option.textContent
    );

    expect(options).not.toHaveLength(0);
    expect(options.filter((text) => text?.includes("in progress"))).toEqual([]);
    expect(panel.find("p_dev_scenario_status")).toBeNull();

    panel.unmount();
  });

  describe("the Security page scenario follows the sign-in scenario", () => {
    const securityOptions = () =>
      Array.from(
        document.querySelectorAll<HTMLOptionElement>("#mocked_api_dev_panel_security_scenario option"),
        ({ value }) => value
      );

    it("hides under the real sign-in, whose Security page is the real service's", () => {
      const panel = renderAt({ pathname: LOGIN });

      panel.selectScenario(SIGN_IN_SCENARIO.REAL_SIGN_IN);

      expect(panel.find("mocked_api_dev_panel_security_scenario")).toBeNull();
      expect(panel.text("p_dev_security_scenario_hidden")).toContain("real auth service");

      panel.unmount();
    });

    it("offers only states with methods to a user the challenge already verified", () => {
      const panel = renderAt({ pathname: LOGIN });

      panel.selectScenario(SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT);

      expect(securityOptions()).not.toContain(SECURITY_SCENARIO.NO_METHODS);
      expect(securityOptions()).toContain(SECURITY_SCENARIO.TOTP_AND_EMAIL);

      panel.unmount();
    });

    it("switches to a fitting state, and stores it, when the current one no longer fits", () => {
      const panel = renderAt({ pathname: LOGIN });

      panel.selectScenario(SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED);

      expect(securityOptions()).toEqual([SECURITY_SCENARIO.ENFORCED_NO_METHODS]);
      expect(readSecurityScenarioCookie(document.cookie)).toBe(SECURITY_SCENARIO.ENFORCED_NO_METHODS);

      panel.unmount();
    });
  });

  it("stores the picked Security page scenario where the methods mock reads it", () => {
    const panel = renderAt({ pathname: LOGIN });

    panel.selectScenario(SECURITY_SCENARIO.INTERNAL_ERROR, "mocked_api_dev_panel_security_scenario");

    expect(readSecurityScenarioCookie(document.cookie)).toBe(SECURITY_SCENARIO.INTERNAL_ERROR);
    expect(panel.text("p_dev_security_scenario_description")).toBe(SECURITY_SCENARIO_INFO.internal_error.description);

    panel.unmount();
  });

  it("shows the credentials the mock accepts, each with a copy and a fill button", () => {
    const panel = renderAt({ pathname: LOGIN });
    const ids = ["email", "password", "verification_code", "mfa_code"];

    expect(panel.text("p_dev_credentials_email")).toContain(MOCK_SIGN_IN_CREDENTIALS.email);
    expect(panel.text("p_dev_credentials_password")).toContain(MOCK_SIGN_IN_CREDENTIALS.password);
    expect(panel.text("p_dev_credentials_verification_code")).toContain(MOCK_SIGN_IN_CREDENTIALS.verificationCode);
    expect(panel.text("p_dev_credentials_mfa_code")).toContain(MOCK_SIGN_IN_CREDENTIALS.mfaCode);
    expect(ids.flatMap((id) => [panel.find(`btn_dev_copy_${id}`), panel.find(`btn_dev_fill_${id}`)])).not.toContain(null);

    panel.unmount();
  });

  it("types the MFA code into the code entry on the page", () => {
    const panel = renderAt({ pathname: MFA_CHALLENGE, state: { challenge: MFA_REQUIRED_CHALLENGE } });

    act(() => panel.find("btn_dev_fill_mfa_code")!.click());

    const digits = Array.from(
      document.querySelectorAll<HTMLInputElement>("[data-test-id^='input_code_digit_']"),
      ({ value }) => value
    ).join("");
    expect(digits).toBe(MOCK_SIGN_IN_CREDENTIALS.mfaCode);

    panel.unmount();
  });

  it("stores the picked scenario where the dev-server mock reads it", () => {
    const panel = renderAt({ pathname: LOGIN });

    panel.selectScenario(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);

    expect(readSignInScenarioCookie(document.cookie)).toBe(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);
    expect(panel.text("p_dev_scenario_description")).toBe(SIGN_IN_SCENARIO_INFO.mfa_email_default.description);

    panel.unmount();
  });

  it("re-runs sign-in with the current address and opens the fresh challenge from its own default", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: noDefaultChallenge });
    const panel = renderAt({ pathname: MFA_CHALLENGE, state: { challenge: MFA_REQUIRED_CHALLENGE } });

    await act(async () => panel.find("btn_dev_rerun_sign_in")!.click());

    expect(createTokenSpy).toHaveBeenCalledWith({
      email: MFA_REQUIRED_CHALLENGE.user_email,
      password: MOCK_SIGN_IN_CREDENTIALS.password
    });
    // No default method, so the fresh challenge opens on the picker rather than the old code entry.
    expect(panel.find("p_verify_your_identity")).not.toBeNull();

    panel.unmount();
  });
});
