import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "@theme/api/auth/errors";
import { CREATE_TOKEN_STATUS } from "@theme/api/auth/signIn";
import { SignInRouterState } from "@theme/hooks/useLoginChallenge";
import { click } from "@theme/tests/dom";
import LandingPage from "@theme/tests/LandingPage";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { ISSUED_TOKEN, MFA_REQUIRED_CHALLENGE } from "@theme/tests/signInFixtures";
import { MFA_CHALLENGE } from "@theme/urls";
import { INITIALIZE, PASSWORD_RECOVERY } from "urls";
import PasswordRecovery from "./PasswordRecovery";

const createTokenSpy = vi.fn();
const updateUserPasswordSpy = vi.fn();
const isFeatureEnabledSpy = vi.fn<(feature: string) => boolean>();

// The transport is the boundary; the steps, the challenge hand-over and the sign-in stay real.
vi.mock("@theme/api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params)
}));

vi.mock("@theme/api/auth/users", () => ({ updateUserPassword: (params: unknown) => updateUserPasswordSpy(params) }));

vi.mock("@theme/hooks/useIsFeatureEnabled", () => ({
  useIsFeatureEnabled: (feature: string) => isFeatureEnabledSpy(feature)
}));

vi.mock("@main/components/PasswordRecovery/PasswordRecovery", () => ({
  default: () => <div data-test-id="upstream_password_recovery" />
}));

// Upstream's forms, down to what the flow needs from them: a submit with the values filled in.
vi.mock("components/forms/ConfirmVerificationCodeForm", () => ({
  default: ({ onSubmit }: { onSubmit: (values: { code: string }) => void }) => (
    <button type="button" data-test-id="stub_submit_code" onClick={() => onSubmit({ code: "123456" })} />
  )
}));

vi.mock("components/forms/CreateNewPasswordForm", () => ({
  default: ({ onSubmit }: { onSubmit: (values: { newPassword: string }) => void }) => (
    <button type="button" data-test-id="stub_submit_password" onClick={() => onSubmit({ newPassword: "n3w-Passw0rd" })} />
  )
}));

const SEARCH = "?email=finops.ffc%40example.com&capability=finops";

const renderRecovery = (state?: SignInRouterState) => {
  const screen = renderWithProviders({
    initialEntry: { pathname: PASSWORD_RECOVERY, search: SEARCH, state },
    routes: (
      <>
        <Route path={PASSWORD_RECOVERY} element={<PasswordRecovery />} />
        <Route path={MFA_CHALLENGE} element={<LandingPage testId="mfa_challenge_page" />} />
        <Route path={INITIALIZE} element={<LandingPage testId="initialize_page" />} />
      </>
    )
  });

  return {
    ...screen,
    click,
    landedState: (testId: string) => JSON.parse(screen.find(testId)?.dataset.state ?? "null") as SignInRouterState
  };
};

let screen: ReturnType<typeof renderRecovery> | null = null;

describe("PasswordRecovery", () => {
  beforeEach(() => {
    // Upstream reads the address and the capability off window.location, not the router.
    window.history.replaceState(null, "", `${PASSWORD_RECOVERY}${SEARCH}`);
    isFeatureEnabledSpy.mockReturnValue(true);
  });

  afterEach(() => {
    screen?.unmount();
    screen = null;
    vi.clearAllMocks();
  });

  it("is upstream's while mfa_login is off", () => {
    isFeatureEnabledSpy.mockReturnValue(false);

    screen = renderRecovery();

    expect(screen.find("upstream_password_recovery")).not.toBeNull();
    expect(isFeatureEnabledSpy).toHaveBeenCalledWith("mfa_login");
  });

  it("signs in with the e-mailed code as verification_code", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
    screen = renderRecovery();

    await screen.click("stub_submit_code");

    expect(createTokenSpy).toHaveBeenCalledWith({ email: "finops.ffc@example.com", verification_code: "123456" });
    expect(screen.find("stub_submit_password")).not.toBeNull();
  });

  it("says when the code is wrong and stays on it", async () => {
    createTokenSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_VERIFICATION_CODE, reason: "invalid" })
    );
    screen = renderRecovery();

    await screen.click("stub_submit_code");

    expect(screen.text("p_code_sign_in_error")).toBe("That code is incorrect. Check it and try again.");
    expect(screen.find("stub_submit_code")).not.toBeNull();
  });

  it("sends a code that needs MFA to the challenge, which is told to come back here", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: MFA_REQUIRED_CHALLENGE });
    screen = renderRecovery();

    await screen.click("stub_submit_code");

    expect(screen.landedState("mfa_challenge_page")).toEqual({
      challenge: MFA_REQUIRED_CHALLENGE,
      continuation: { returnsToPasswordRecovery: true, search: SEARCH }
    });
  });

  it("opens on the new password once back from the challenge with its token", () => {
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    expect(screen.find("stub_submit_password")).not.toBeNull();
  });

  it("sets the new password as the recovered user, then signs in with it", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    await screen.click("stub_submit_password");

    expect(updateUserPasswordSpy).toHaveBeenCalledWith({
      token: ISSUED_TOKEN.token,
      userId: ISSUED_TOKEN.user_id,
      password: "n3w-Passw0rd"
    });
    expect(createTokenSpy).toHaveBeenCalledWith({ email: ISSUED_TOKEN.user_email, password: "n3w-Passw0rd" });
    expect(screen.find("btn_proceed_to_app")).not.toBeNull();
  });

  it("says when the password could not be set", async () => {
    updateUserPasswordSpy.mockRejectedValue(new Error("401"));
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    await screen.click("stub_submit_password");

    expect(screen.find("p_new_password_error")).not.toBeNull();
    expect(createTokenSpy).not.toHaveBeenCalled();
  });

  it("proceeds into the app with the capability once the new password signs in", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    await screen.click("stub_submit_password");
    await screen.click("btn_proceed_to_app");

    expect(screen.find("initialize_page")?.dataset.search).toBe("?capability=finops");
  });

  it("proceeds through MFA when the new password's sign-in needs it, and then into the app", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: MFA_REQUIRED_CHALLENGE });
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    await screen.click("stub_submit_password");
    await screen.click("btn_proceed_to_app");

    expect(screen.landedState("mfa_challenge_page")).toEqual({
      challenge: MFA_REQUIRED_CHALLENGE,
      continuation: { search: "?capability=finops" }
    });
  });
});
