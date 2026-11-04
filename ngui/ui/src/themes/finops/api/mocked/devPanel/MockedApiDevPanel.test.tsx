import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE, MFA_VERIFICATION_FAILURE } from "@theme/api/auth/signIn";
import { LoginChallenge } from "@theme/api/auth/signIn/types";
import { CHALLENGE_BODY } from "@theme/api/mocked/auth/signIn/fixtures";
import { SIGN_IN_SCENARIO } from "@theme/api/mocked/auth/signIn/scenarios";
import { MOCK_SIGN_IN_CREDENTIALS, SIGN_IN_SCENARIO_COOKIE } from "@theme/api/mocked/config";
import { readSignInScenarioCookie } from "@theme/api/mocked/http/signInScenarioCookie";
import MfaChallengeStep from "@theme/components/MfaChallengeStep";
import { SignInRouterState } from "@theme/hooks/useLoginChallenge";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { MFA_CHALLENGE } from "@theme/urls";
import { LOGIN } from "urls";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import MockedApiDevPanel from "./MockedApiDevPanel";

const [totpMethod, emailMethod] = CHALLENGE_BODY.MFA_TOTP_DEFAULT.methods;

const totpDefaultChallenge: LoginChallenge = {
  challenge_id: "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED,
  expires_at: getCurrentUTCTimeInSec() + 5 * 60,
  user_email: "finops.ffc@example.com",
  methods: [totpMethod, emailMethod],
  default_method_id: totpMethod.id,
  code_sent: false,
  attempts_left: 5
};

const noDefaultChallenge: LoginChallenge = {
  ...totpDefaultChallenge,
  challenge_id: "7e3a5d1f-4c2b-4c8f-8e2f-1a5d3b7c9f02",
  methods: [{ ...totpMethod, is_default: false }, emailMethod],
  default_method_id: null
};

const createTokenSpy = vi.fn();

// The transport is the boundary: the panel's own routing and the MFA screen stay real.
vi.mock("@theme/api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params)
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
    selectScenario: (scenario: string) =>
      act(() => {
        const select = container.querySelector("select")!;
        select.value = scenario;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }),
    unmount
  };
};

describe("MockedApiDevPanel", () => {
  afterEach(() => {
    document.cookie = `${SIGN_IN_SCENARIO_COOKIE}=; path=/; max-age=0`;
    createTokenSpy.mockReset();
  });

  it("shows the credentials the mock accepts", () => {
    const panel = renderAt({ pathname: LOGIN });

    expect(panel.text("p_dev_credentials_email")).toContain(MOCK_SIGN_IN_CREDENTIALS.email);
    expect(panel.text("p_dev_credentials_password")).toContain(MOCK_SIGN_IN_CREDENTIALS.password);

    panel.unmount();
  });

  it("stores the picked scenario where the dev-server mock reads it", () => {
    const panel = renderAt({ pathname: LOGIN });

    panel.selectScenario(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);

    expect(readSignInScenarioCookie(document.cookie)).toBe(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);
    expect(panel.text("p_dev_scenario_description")).toContain("e-mail is the default");

    panel.unmount();
  });

  it("shows which MFA screen is up, as reported by the challenge itself", () => {
    const panel = renderAt({ pathname: MFA_CHALLENGE, state: { challenge: totpDefaultChallenge } });

    expect(panel.text("p_dev_route")).toBe("MFA challenge");
    expect(panel.text("p_dev_mfa_stage")).toBe("MfaCodeEntry — authenticator app (TOTP) · default method");
    expect(panel.text("dl_dev_challenge")).toContain(totpDefaultChallenge.challenge_id);

    panel.unmount();
  });

  it("re-runs sign-in with the current address and opens the fresh challenge from its own default", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: noDefaultChallenge });
    const panel = renderAt({ pathname: MFA_CHALLENGE, state: { challenge: totpDefaultChallenge } });

    await act(async () => panel.find("btn_dev_rerun_sign_in")!.click());

    expect(createTokenSpy).toHaveBeenCalledWith({
      email: totpDefaultChallenge.user_email,
      password: MOCK_SIGN_IN_CREDENTIALS.password
    });
    expect(panel.text("p_dev_mfa_stage")).toBe("MfaMethodPicker — choosing a method");
    expect(panel.text("dl_dev_challenge")).toContain(noDefaultChallenge.challenge_id);

    panel.unmount();
  });

  it("logs why a challenge ended to the console, not the panel", () => {
    const consoleInfo = vi.spyOn(console, "info").mockImplementation(() => {});
    const panel = renderAt({
      pathname: MFA_CHALLENGE,
      state: {
        mfaTerminalFailure: { reason: MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED, userEmail: MOCK_SIGN_IN_CREDENTIALS.email }
      }
    });

    expect(consoleInfo).toHaveBeenCalledWith(expect.stringContaining(MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED));
    expect(panel.text("mocked_api_dev_panel")).not.toContain(MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED);

    consoleInfo.mockRestore();
    panel.unmount();
  });
});
