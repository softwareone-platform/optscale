import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TOKEN_BODY } from "@theme/api/mocked/auth/signIn/fixtures";
import { MOCKED_REAL_SESSION_PATH } from "@theme/api/mocked/config";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { LOGIN } from "urls";
import RealSessionSection from "./RealSessionSection";

const mockRequestAuth = vi.fn();
const mockUseGetToken = vi.fn();
const mockSignOut = vi.fn();
const chooseRealSignInSpy = vi.fn();

// The dev server and the redux session are the boundaries; the section's own logic stays real.
vi.mock("@theme/api/auth/request", () => ({
  requestAuth: (path: string, options: unknown) => mockRequestAuth(path, options)
}));
vi.mock("hooks/useGetToken", () => ({ useGetToken: () => mockUseGetToken() }));
vi.mock("hooks/useSignOut", () => ({ useSignOut: () => mockSignOut }));

const REAL_USER = { token: "MDAxY-real", userId: "9c2a", userEmail: "reto.mayer@example.com" };

const STORED = { user_id: "9c2a", user_email: "reto.mayer@example.com", captured_at: 1_758_480_000 };

const renderSection = async () => {
  const section = renderWithProviders({
    initialEntry: "/",
    routes: (
      <>
        <Route path="/" element={<RealSessionSection onChooseRealSignIn={chooseRealSignInSpy} />} />
        <Route path={LOGIN} element={<div data-test-id="login_page" />} />
      </>
    )
  });

  // Lets the status request on mount settle.
  await act(async () => {});

  return section;
};

const answerStatus = (session: typeof STORED | null) => mockRequestAuth.mockResolvedValue({ status: 200, data: { session } });

describe("RealSessionSection", () => {
  beforeEach(() => {
    mockUseGetToken.mockReturnValue({});
  });

  afterEach(() => {
    mockRequestAuth.mockReset();
    vi.clearAllMocks();
  });

  it("says None while no session is stored, and offers signing in with real data", async () => {
    answerStatus(null);

    const section = await renderSection();

    expect(section.text("p_dev_real_session")).toBe("None");
    expect(section.find("btn_dev_sign_in_for_real")).not.toBeNull();
    expect(section.find("btn_dev_capture_real_session")).toBeNull();

    section.unmount();
  });

  it("picks the real sign-in and goes to the login page when signed out", async () => {
    answerStatus(null);
    const section = await renderSection();

    await act(async () => section.find("btn_dev_sign_in_for_real")!.click());

    expect(chooseRealSignInSpy).toHaveBeenCalled();
    expect(section.find("login_page")).not.toBeNull();

    section.unmount();
  });

  it("signs a mocked session out first, which lands on the login page by itself", async () => {
    mockUseGetToken.mockReturnValue({ ...REAL_USER, token: TOKEN_BODY.token });
    answerStatus(null);
    const section = await renderSection();

    await act(async () => section.find("btn_dev_sign_in_for_real")!.click());

    expect(chooseRealSignInSpy).toHaveBeenCalled();
    expect(mockSignOut).toHaveBeenCalled();

    section.unmount();
  });

  it("captures the signed-in user's real token on the dev server", async () => {
    mockUseGetToken.mockReturnValue(REAL_USER);
    answerStatus(null);
    const section = await renderSection();
    answerStatus(STORED);

    await act(async () => section.find("btn_dev_capture_real_session")!.click());

    expect(mockRequestAuth).toHaveBeenLastCalledWith(MOCKED_REAL_SESSION_PATH, {
      body: { token: "MDAxY-real", user_id: "9c2a", user_email: "reto.mayer@example.com" }
    });
    expect(section.text("p_dev_real_session")).toBe("reto.mayer@example.com");
    expect(section.find("btn_dev_sign_in_for_real")).toBeNull();

    section.unmount();
  });

  it("offers no capture for the mock's own macaroon, which no backend accepts", async () => {
    mockUseGetToken.mockReturnValue({ ...REAL_USER, token: TOKEN_BODY.token });
    answerStatus(null);

    const section = await renderSection();

    expect(section.find("btn_dev_capture_real_session")).toBeNull();

    section.unmount();
  });

  it("offers no capture when the signed-in user's session is the stored one", async () => {
    mockUseGetToken.mockReturnValue(REAL_USER);
    answerStatus(STORED);

    const section = await renderSection();

    expect(section.find("btn_dev_capture_real_session")).toBeNull();

    section.unmount();
  });

  it("forgets the stored session", async () => {
    answerStatus(STORED);
    const section = await renderSection();
    mockRequestAuth.mockResolvedValue({ status: 204, data: null });

    await act(async () => section.find("btn_dev_forget_real_session")!.click());

    expect(mockRequestAuth).toHaveBeenLastCalledWith(MOCKED_REAL_SESSION_PATH, { method: "DELETE" });
    expect(section.text("p_dev_real_session")).toBe("None");

    section.unmount();
  });

  it("says so when the dev server does not answer", async () => {
    mockRequestAuth.mockRejectedValue(new Error("Failed to fetch"));

    const section = await renderSection();

    expect(section.find("p_dev_real_session_error")).not.toBeNull();

    section.unmount();
  });
});
