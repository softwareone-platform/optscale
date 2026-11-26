import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { CREATE_TOKEN_STATUS } from "api/auth/signIn";
import { SignInRouterState } from "hooks/useLoginChallenge";
import { click } from "tests/dom";
import LandingPage from "tests/LandingPage";
import { renderWithProviders } from "tests/renderWithProviders";
import { ISSUED_TOKEN, MFA_REQUIRED_CHALLENGE } from "tests/signInFixtures";
import { MFA_CHALLENGE, INITIALIZE, LOGIN, PASSWORD_RECOVERY } from "urls";
import PasswordRecovery from "./PasswordRecoveryWithMfa";

const createTokenSpy = vi.fn();
const updateUserPasswordSpy = vi.fn();

// The transport is the boundary; the steps, the challenge hand-over and the sign-in stay real.
vi.mock("api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params),
}));

vi.mock("api/auth/users", () => ({ updateUserPassword: (params: unknown) => updateUserPasswordSpy(params) }));

// Upstream's forms, down to what the flow needs from them: a submit with the values filled in.
vi.mock("components/PasswordRecovery/RecoveryCodeForm", () => ({
  default: ({ onSubmit }: { onSubmit: (values: { code: string }) => void }) => (
    <button type="button" data-test-id="stub_submit_code" onClick={() => onSubmit({ code: "123456" })} />
  ),
}));

vi.mock("components/forms/CreateNewPasswordForm", () => ({
  default: ({ onSubmit, email }: { onSubmit: (values: { newPassword: string }) => void; email?: string }) => (
    <button
      type="button"
      data-test-id="stub_submit_password"
      data-email={email}
      onClick={() => onSubmit({ newPassword: "n3w-Passw0rd" })}
    />
  ),
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
        <Route path={LOGIN} element={<LandingPage testId="login_page" />} />
      </>
    ),
  });

  return {
    ...screen,
    click,
    landedState: (testId: string) => JSON.parse(screen.find(testId)?.dataset.state ?? "null") as SignInRouterState,
  };
};

let screen: ReturnType<typeof renderRecovery> | null = null;

const openNewPasswordWithoutMfa = async () => {
  createTokenSpy.mockResolvedValueOnce({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
  screen = renderRecovery();
  await screen.click("stub_submit_code");

  return screen;
};

describe("PasswordRecovery", () => {
  beforeEach(() => {
    // Upstream reads the address and the capability off window.location, not the router.
    window.history.replaceState(null, "", `${PASSWORD_RECOVERY}${SEARCH}`);
  });

  afterEach(() => {
    screen?.unmount();
    screen = null;
    vi.clearAllMocks();
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
      continuation: { returnsToPasswordRecovery: true, search: SEARCH },
    });
  });

  it("opens on the new password once back from the challenge with its token", () => {
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    expect(screen.find("stub_submit_password")).not.toBeNull();
  });

  it("fills the new password form's account from the recovery token, as the URL may have lost it on the way", () => {
    window.history.replaceState(null, "", PASSWORD_RECOVERY);
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    expect(screen.find("stub_submit_password")?.dataset.email).toBe(ISSUED_TOKEN.user_email);
  });

  it("sets the new password as the recovered user, then signs in with it", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
    screen = await openNewPasswordWithoutMfa();

    await screen.click("stub_submit_password");

    expect(updateUserPasswordSpy).toHaveBeenCalledWith({
      token: ISSUED_TOKEN.token,
      userId: ISSUED_TOKEN.user_id,
      password: "n3w-Passw0rd",
    });
    expect(createTokenSpy).toHaveBeenCalledWith({ email: ISSUED_TOKEN.user_email, password: "n3w-Passw0rd" });
    expect(screen.find("btn_proceed_to_app")).not.toBeNull();
  });

  it("says when the password could not be set", async () => {
    updateUserPasswordSpy.mockRejectedValue(new Error("401"));
    screen = await openNewPasswordWithoutMfa();
    createTokenSpy.mockClear();

    await screen.click("stub_submit_password");

    expect(screen.find("p_new_password_error")).not.toBeNull();
    expect(createTokenSpy).not.toHaveBeenCalled();
  });

  it("says the password is changed and leads to the login page when only the sign-in after it fails", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockRejectedValue(new Error("502"));
    screen = await openNewPasswordWithoutMfa();

    await screen.click("stub_submit_password");

    // The recovery token died with the old salt, so the form that would send it again is gone.
    expect(screen.find("stub_submit_password")).toBeNull();
    expect(screen.find("p_new_password_error")).toBeNull();

    await screen.click("btn_proceed_to_app");

    expect(screen.find("login_page")?.dataset.search).toBe("?email=finops.ffc%40example.com");
  });

  it("labels the way on Sign in, not Proceed into the app, when it leads to the login page", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockRejectedValue(new Error("502"));
    screen = await openNewPasswordWithoutMfa();

    await screen.click("stub_submit_password");

    expect(screen.text("btn_proceed_to_app")).toBe("Sign in");
  });

  it("says why when that sign-in is refused for too many wrong codes", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS, reason: "too many" })
    );
    screen = await openNewPasswordWithoutMfa();

    await screen.click("stub_submit_password");

    expect(screen.text("p_new_password_error")).toContain("Wait 15 minutes");
    expect(screen.find("btn_proceed_to_app")).not.toBeNull();
  });

  it("proceeds into the app with the capability once the new password signs in", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
    screen = await openNewPasswordWithoutMfa();

    await screen.click("stub_submit_password");
    await screen.click("btn_proceed_to_app");

    expect(screen.find("initialize_page")?.dataset.search).toBe("?capability=finops");
  });

  it("proceeds through MFA when the new password's sign-in needs it, and then into the app", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: MFA_REQUIRED_CHALLENGE });
    screen = await openNewPasswordWithoutMfa();

    await screen.click("stub_submit_password");
    await screen.click("btn_proceed_to_app");

    expect(screen.landedState("mfa_challenge_page")).toEqual({
      challenge: MFA_REQUIRED_CHALLENGE,
      continuation: { search: "?capability=finops" },
    });
  });

  it("leads to the login page without signing in again once the recovery passed MFA", async () => {
    updateUserPasswordSpy.mockResolvedValue({});
    screen = renderRecovery({ recoveryToken: ISSUED_TOKEN });

    await screen.click("stub_submit_password");

    // That sign-in's challenge would spend the e-mail code the login page's challenge needs.
    expect(createTokenSpy).not.toHaveBeenCalled();
    expect(screen.find("p_new_password_error")).toBeNull();
    expect(screen.text("btn_proceed_to_app")).toBe("Sign in");

    await screen.click("btn_proceed_to_app");

    expect(screen.find("login_page")?.dataset.search).toBe("?email=finops.ffc%40example.com");
  });
});
