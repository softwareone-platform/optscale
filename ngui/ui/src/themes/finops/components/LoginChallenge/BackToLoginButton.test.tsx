import { ComponentProps } from "react";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { click, find } from "@theme/tests/dom";
import { renderWithProviders } from "@theme/tests/renderWithProviders";
import { MFA_CHALLENGE } from "@theme/urls";
import { LOGIN } from "urls";
import BackToLoginButton from "./BackToLoginButton";

let unmount: () => void;

const renderButton = (props: ComponentProps<typeof BackToLoginButton> = {}) => {
  ({ unmount } = renderWithProviders({
    initialEntry: MFA_CHALLENGE,
    routes: (
      <>
        <Route path={MFA_CHALLENGE} element={<BackToLoginButton {...props} />} />
        <Route path={LOGIN} element={<div data-test-id="login_page" />} />
      </>
    )
  }));
};

describe("BackToLoginButton", () => {
  afterEach(() => unmount());

  it("reads Back and leads to the login page", async () => {
    renderButton();

    expect(find("btn_back_to_login")?.textContent).toBe("Back");

    await click("btn_back_to_login");

    expect(find("login_page")).not.toBeNull();
  });

  it("leads to the login page under the label and test id a screen gives it", async () => {
    renderButton({ messageId: "signOut", dataTestId: "btn_sign_out" });

    expect(find("btn_back_to_login")).toBeNull();
    expect(find("btn_sign_out")?.textContent).toBe("Sign out");

    await click("btn_sign_out");

    expect(find("login_page")).not.toBeNull();
  });
});
