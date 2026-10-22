import { MockedProvider } from "@apollo/client/testing";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ThemeProviderWrapper from "components/ThemeProviderWrapper";
import { ALERTS } from "components/TopAlertWrapper/reducer";
import intlConfig from "translations/react-intl-config";
import { LOGIN } from "urls";
import AuthorizationContainer from "./AuthorizationContainer";

// Opts this file into React 18's act() environment so state updates are flushed, not warned about.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const mockIsFeatureEnabled = vi.fn();

vi.mock("@theme/hooks/useIsFeatureEnabled", () => ({
  useIsFeatureEnabled: (featureName: string) => mockIsFeatureEnabled(featureName)
}));

const store = createStore(() => ({ [ALERTS]: {} }));

const renderLoginPage = () => {
  const container = document.createElement("div");
  const root = createRoot(container);

  act(() => {
    root.render(
      <Provider store={store}>
        <MockedProvider>
          <ThemeProviderWrapper>
            <IntlProvider {...intlConfig}>
              <MemoryRouter initialEntries={[LOGIN]}>
                <Routes>
                  <Route path={LOGIN} element={<AuthorizationContainer />} />
                </Routes>
              </MemoryRouter>
            </IntlProvider>
          </ThemeProviderWrapper>
        </MockedProvider>
      </Provider>
    );
  });

  return {
    find: (testId: string) => container.querySelector(`[data-test-id='${testId}']`),
    unmount: () => act(() => root.unmount())
  };
};

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
