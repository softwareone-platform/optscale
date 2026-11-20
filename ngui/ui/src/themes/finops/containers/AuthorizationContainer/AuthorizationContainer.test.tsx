import { Route } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { LOGIN } from "urls";
import AuthorizationContainer from "./AuthorizationContainer";

const mockIsFeatureEnabled = vi.fn();

vi.mock("@theme/hooks/useIsFeatureEnabled", () => ({
  useIsFeatureEnabled: (featureName: string) => mockIsFeatureEnabled(featureName)
}));

const renderLoginPage = () =>
  renderWithProviders({
    initialEntry: LOGIN,
    routes: <Route path={LOGIN} element={<AuthorizationContainer />} />
  });

describe("AuthorizationContainer", () => {
  beforeEach(() => {
    mockIsFeatureEnabled.mockReset();
  });

  it("keeps the original single-step login while mfa_login is off", () => {
    mockIsFeatureEnabled.mockReturnValue(false);

    const { find, unmount } = renderLoginPage();

    expect(find("input_pass")).not.toBeNull();
    expect(find("btn_login")).not.toBeNull();
    expect(find("btn_continue")).toBeNull();

    unmount();
  });

  it("asks for the address alone once mfa_login is on", () => {
    mockIsFeatureEnabled.mockReturnValue(true);

    const { find, unmount } = renderLoginPage();

    expect(find("btn_continue")).not.toBeNull();
    expect(find("input_pass")).toBeNull();
    expect(find("btn_login")).toBeNull();

    unmount();
  });

  it("reads the flag under the name the theme registers it as", () => {
    mockIsFeatureEnabled.mockReturnValue(false);

    const { unmount } = renderLoginPage();

    expect(mockIsFeatureEnabled).toHaveBeenCalledWith("mfa_login");

    unmount();
  });
});
