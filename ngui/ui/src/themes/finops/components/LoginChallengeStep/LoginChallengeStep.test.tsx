import { Route } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn";
import { LoginChallenge } from "@theme/api/auth/signIn/types";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { MFA_ENROLLMENT } from "@theme/urls";
import { LOGIN } from "urls";
import LoginChallengeStep from "./LoginChallengeStep";

const challenge: LoginChallenge = {
  challenge_id: "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  state: LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED,
  expires_at: 1758480300,
  user_email: "finops.ffc@example.com",
  methods: [],
  default_method_id: null,
  code_sent: false,
  attempts_left: 5
};

const renderAt = (initialEntry: { pathname: string; state?: { challenge: LoginChallenge } }) =>
  renderWithProviders({
    initialEntry,
    routes: (
      <>
        <Route
          path={MFA_ENROLLMENT}
          element={
            <LoginChallengeStep
              titleMessageId="signIn:enrollmentRequiredTitle"
              descriptionMessageId="signIn:enrollmentRequiredDescription"
            />
          }
        />
        <Route path={LOGIN} element={<div data-test-id="login_page" />} />
      </>
    )
  });

describe("LoginChallengeStep", () => {
  it("shows which account is signing in", () => {
    const { container, unmount } = renderAt({ pathname: MFA_ENROLLMENT, state: { challenge } });

    expect(container.querySelector("[data-test-id='p_signing_in_as']")?.textContent).toContain("finops.ffc@example.com");
    expect(container.querySelector("[data-test-id='p_login_challenge_title']")?.textContent).toBe(
      "Set up two-step verification"
    );

    unmount();
  });

  it("sends a visitor who never passed the password step back to login", () => {
    const { container, unmount } = renderAt({ pathname: MFA_ENROLLMENT });

    expect(container.querySelector("[data-test-id='login_page']")).not.toBeNull();
    expect(container.querySelector("[data-test-id='p_signing_in_as']")).toBeNull();

    unmount();
  });
});
