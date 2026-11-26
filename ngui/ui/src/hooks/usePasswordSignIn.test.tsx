import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { CREATE_TOKEN_STATUS } from "api/auth/signIn";
import { click, find } from "tests/dom";
import LandingPage from "tests/LandingPage";
import { renderWithProviders } from "tests/renderWithProviders";
import { MFA_REQUIRED_CHALLENGE } from "tests/signInFixtures";
import { EMAIL_VERIFICATION, LOGIN, MFA_CHALLENGE } from "urls";
import { usePasswordSignIn } from "./usePasswordSignIn";

const createTokenSpy = vi.fn();

// The transport is the boundary; the challenge hand-over stays real.
vi.mock("api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/signIn")>()),
  createToken: (params: unknown) => createTokenSpy(params),
}));

const SEARCH = "?next=%2Fpools&capability=finops";

const LoginPage = () => {
  const { signIn, error } = usePasswordSignIn();

  return (
    <>
      <button data-test-id="btn_sign_in" onClick={() => signIn({ email: "finops.ffc@example.com", password: "password" })} />
      {error && <p data-test-id="p_error">{error.messageId}</p>}
    </>
  );
};

let unmount: () => void;

const signIn = async () => {
  ({ unmount } = renderWithProviders({
    initialEntry: { pathname: LOGIN, search: SEARCH },
    routes: (
      <>
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={MFA_CHALLENGE} element={<LandingPage testId="mfa_page" />} />
        <Route path={EMAIL_VERIFICATION} element={<LandingPage testId="email_verification_page" />} />
      </>
    ),
  }));

  await click("btn_sign_in");
};

describe("usePasswordSignIn", () => {
  afterEach(() => {
    unmount();
    vi.clearAllMocks();
  });

  it("hands the challenge the login page's query, so `next` and the capability survive the MFA step", async () => {
    createTokenSpy.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: MFA_REQUIRED_CHALLENGE });

    await signIn();

    expect(JSON.parse(find("mfa_page")!.dataset.state!)).toEqual({
      challenge: MFA_REQUIRED_CHALLENGE,
      continuation: { search: SEARCH },
    });
  });

  it("sends an unverified address to e-mail verification", async () => {
    createTokenSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED, reason: "not verified" })
    );

    await signIn();

    expect(find("email_verification_page")?.dataset.search).toBe("?email=finops.ffc%40example.com");
  });

  it("stays on the login page with a message when the password is refused", async () => {
    createTokenSpy.mockRejectedValue(
      new AuthApiError({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_CREDENTIALS, reason: "invalid" })
    );

    await signIn();

    expect(find("p_error")?.textContent).toBe("signIn:invalidCredentials");
  });
});
