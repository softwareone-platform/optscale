import { ReactNode } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { describe, expect, it } from "vitest";
import { LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn";
import { LoginChallenge } from "@theme/api/auth/signIn/types";
import { MFA_CHALLENGE } from "@theme/urls";
import ThemeProviderWrapper from "components/ThemeProviderWrapper";
import { ALERTS } from "components/TopAlertWrapper/reducer";
import intlConfig from "translations/react-intl-config";
import { LOGIN } from "urls";
import LoginChallengeStep from "./LoginChallengeStep";

// Opts this file into React 18's act() environment so state updates are flushed, not warned about.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// A plain store rather than redux-mock-store: nothing here asserts on dispatched actions, and that
// package ships no types. Greeter reaches TopAlertWrapper, which needs the alerts slice to exist.
const store = createStore(() => ({ [ALERTS]: {} }));

const challenge: LoginChallenge = {
  challenge_id: "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED,
  expires_at: 1758480300,
  user_email: "finops.ffc@example.com",
  methods: [],
  default_method_id: null,
  code_sent: false,
  attempts_left: 5
};

const renderAt = (entry: { pathname: string; state?: { challenge: LoginChallenge } }) => {
  const container = document.createElement("div");
  const root = createRoot(container);

  const wrap = (children: ReactNode) => (
    <Provider store={store}>
      <MockedProvider>
        <ThemeProviderWrapper>
          <IntlProvider {...intlConfig}>
            <MemoryRouter initialEntries={[entry]}>
              <Routes>
                <Route path={MFA_CHALLENGE} element={children} />
                {/* Stands in for the login page, so a redirect is observable in the DOM. */}
                <Route path={LOGIN} element={<div data-test-id="login_page" />} />
              </Routes>
            </MemoryRouter>
          </IntlProvider>
        </ThemeProviderWrapper>
      </MockedProvider>
    </Provider>
  );

  act(() => {
    root.render(
      wrap(<LoginChallengeStep titleMessageId="signIn:mfaRequiredTitle" descriptionMessageId="signIn:mfaRequiredDescription" />)
    );
  });

  return {
    container,
    unmount: () => act(() => root.unmount())
  };
};

describe("LoginChallengeStep", () => {
  it("shows which account is signing in", () => {
    const { container, unmount } = renderAt({ pathname: MFA_CHALLENGE, state: { challenge } });

    expect(container.querySelector("[data-test-id='p_signing_in_as']")?.textContent).toContain("finops.ffc@example.com");
    expect(container.querySelector("[data-test-id='p_login_challenge_title']")?.textContent).toBe("Two-step verification");

    unmount();
  });

  it("sends a visitor who never passed the password step back to login", () => {
    const { container, unmount } = renderAt({ pathname: MFA_CHALLENGE });

    expect(container.querySelector("[data-test-id='login_page']")).not.toBeNull();
    expect(container.querySelector("[data-test-id='p_signing_in_as']")).toBeNull();

    unmount();
  });
});
