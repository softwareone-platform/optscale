import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CREATE_TOKEN_STATUS } from "api/auth/signIn";
import { click } from "tests/dom";
import LandingPage from "tests/LandingPage";
import { renderWithProviders } from "tests/renderWithProviders";
import { ISSUED_TOKEN, MFA_REQUIRED_CHALLENGE } from "tests/signInFixtures";
import { MFA_CHALLENGE, EMAIL_VERIFICATION, INITIALIZE } from "urls";
import EmailVerification from "./EmailVerificationWithMfa";

const createTokenSpy = vi.fn();

vi.mock("api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params),
}));

vi.mock("components/forms/ConfirmEmailVerificationCodeForm", () => ({
  default: ({ onSubmit }: { onSubmit: (values: { code: string }) => void }) => (
    <button type="button" data-test-id="stub_submit_code" onClick={() => onSubmit({ code: "123456" })} />
  ),
}));

const SEARCH = "?email=finops.ffc%40example.com&capability=finops";

let screen: ReturnType<typeof renderWithProviders> | null = null;

const renderVerification = () => {
  screen = renderWithProviders({
    initialEntry: { pathname: EMAIL_VERIFICATION, search: SEARCH },
    routes: (
      <>
        <Route path={EMAIL_VERIFICATION} element={<EmailVerification />} />
        <Route path={MFA_CHALLENGE} element={<LandingPage testId="mfa_challenge_page" />} />
        <Route path={INITIALIZE} element={<LandingPage testId="initialize_page" />} />
      </>
    ),
  });

  return screen;
};

describe("EmailVerification", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", `${EMAIL_VERIFICATION}${SEARCH}`);
  });

  afterEach(() => {
    screen?.unmount();
    screen = null;
    vi.clearAllMocks();
  });

  it("proceeds into the app with the policy prompt and the capability once the code signs in", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: ISSUED_TOKEN });
    const page = renderVerification();

    await click("stub_submit_code");
    await click("btn_proceed_to_app");

    expect(createTokenSpy).toHaveBeenCalledWith({ email: "finops.ffc@example.com", verification_code: "123456" });
    expect(page.find("initialize_page")?.dataset.search).toBe("?showPolicy=true&capability=finops");
  });

  it("confirms the address first and asks for MFA behind Proceed, keeping the same query", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: MFA_REQUIRED_CHALLENGE });
    const page = renderVerification();

    await click("stub_submit_code");

    expect(page.find("mfa_challenge_page")).toBeNull();

    await click("btn_proceed_to_app");

    expect(JSON.parse(page.find("mfa_challenge_page")!.dataset.state!)).toEqual({
      challenge: MFA_REQUIRED_CHALLENGE,
      continuation: { search: "?showPolicy=true&capability=finops" },
    });
  });
});
