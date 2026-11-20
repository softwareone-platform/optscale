import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CREATE_TOKEN_STATUS } from "@theme/api/auth/signIn";
import { click } from "@theme/tests/dom";
import LandingPage from "@theme/tests/LandingPage";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { ISSUED_TOKEN, MFA_REQUIRED_CHALLENGE } from "@theme/tests/signInFixtures";
import { MFA_CHALLENGE } from "@theme/urls";
import { EMAIL_VERIFICATION, INITIALIZE } from "urls";
import EmailVerification from "./EmailVerification";

const createTokenSpy = vi.fn();
const isFeatureEnabledSpy = vi.fn<(feature: string) => boolean>();

vi.mock("@theme/api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params)
}));

vi.mock("@theme/hooks/useIsFeatureEnabled", () => ({
  useIsFeatureEnabled: (feature: string) => isFeatureEnabledSpy(feature)
}));

vi.mock("@main/components/EmailVerification/EmailVerification", () => ({
  default: () => <div data-test-id="upstream_email_verification" />
}));

vi.mock("components/forms/ConfirmEmailVerificationCodeForm", () => ({
  default: ({ onSubmit }: { onSubmit: (values: { code: string }) => void }) => (
    <button type="button" data-test-id="stub_submit_code" onClick={() => onSubmit({ code: "123456" })} />
  )
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
    )
  });

  return screen;
};

describe("EmailVerification", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", `${EMAIL_VERIFICATION}${SEARCH}`);
    isFeatureEnabledSpy.mockReturnValue(true);
  });

  afterEach(() => {
    screen?.unmount();
    screen = null;
    vi.clearAllMocks();
  });

  it("is upstream's while mfa_login is off", () => {
    isFeatureEnabledSpy.mockReturnValue(false);

    const page = renderVerification();

    expect(page.find("upstream_email_verification")).not.toBeNull();
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
      continuation: { search: "?showPolicy=true&capability=finops" }
    });
  });
});
