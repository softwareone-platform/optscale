import { ReactNode } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { describe, expect, it, vi } from "vitest";
import ThemeProviderWrapper from "components/ThemeProviderWrapper";
import { ALERTS } from "components/TopAlertWrapper/reducer";
import intlConfig from "translations/react-intl-config";
import TwoStepLoginForm from "./TwoStepLoginForm";

// Opts this file into React 18's act() environment so state updates are flushed, not warned about.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Stubbed at the transport boundary only — LOGIN_METHOD stays real, so the form is still checked
// against the value the contract actually uses.
vi.mock("@theme/api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@theme/api/auth/signIn")>()),
  resolveLoginOptions: () => Promise.resolve({ methods: ["password"], sso: { state: "not_configured" } })
}));

const store = createStore(() => ({ [ALERTS]: {} }));

const render = (props: Partial<Parameters<typeof TwoStepLoginForm>[0]> = {}) => {
  const container = document.createElement("div");
  const root = createRoot(container);

  const wrap = (children: ReactNode) => (
    <Provider store={store}>
      <MockedProvider>
        <ThemeProviderWrapper>
          <IntlProvider {...intlConfig}>
            <MemoryRouter>{children}</MemoryRouter>
          </IntlProvider>
        </ThemeProviderWrapper>
      </MockedProvider>
    </Provider>
  );

  act(() => {
    root.render(wrap(<TwoStepLoginForm onSubmit={vi.fn()} {...props} />));
  });

  const find = (testId: string) => container.querySelector<HTMLInputElement>(`[data-test-id='${testId}']`);

  const type = async (testId: string, value: string) => {
    const input = find(testId)!;
    const { set } = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!;

    await act(async () => {
      set!.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  return {
    find,
    type,
    unmount: () => act(() => root.unmount()),
    rerender: async (nextProps: Partial<Parameters<typeof TwoStepLoginForm>[0]>) => {
      await act(async () => {
        root.render(wrap(<TwoStepLoginForm onSubmit={vi.fn()} {...props} {...nextProps} />));
      });
    },
    typeEmail: (value: string) => type("input_email", value),
    submit: async () => {
      await act(async () => {
        container.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      });
    }
  };
};

describe("TwoStepLoginForm", () => {
  it("asks for the address alone first — no password field before Continue", () => {
    const { find, unmount } = render();

    expect(find("input_email")).not.toBeNull();
    expect(find("btn_continue")).not.toBeNull();
    expect(find("input_pass")).toBeNull();

    unmount();
  });

  it("moves to the password step once login_options resolves", async () => {
    const form = render();

    await form.typeEmail("finops.ffc@example.com");
    await form.submit();

    expect(form.find("input_pass")).not.toBeNull();
    expect(form.find("btn_continue")).toBeNull();

    form.unmount();
  });

  it("holds on the email step when the address does not validate, and asks for nothing else", async () => {
    const form = render();

    await form.typeEmail("not-an-email");
    await form.submit();

    expect(form.find("input_pass")).toBeNull();
    expect(form.find("btn_continue")).not.toBeNull();

    form.unmount();
  });

  it("keeps the address out of reach on the password step, so it cannot drift from the resolved one", async () => {
    const form = render();

    await form.typeEmail("finops.ffc@example.com");
    await form.submit();

    expect(form.find("input_email")?.readOnly).toBe(true);

    form.unmount();
  });

  it("hands the password field back empty when the attempt was rejected", async () => {
    const form = render();

    await form.typeEmail("finops.ffc@example.com");
    await form.submit();
    await form.type("input_pass", "wrong-password");

    expect(form.find("input_pass")?.value).toBe("wrong-password");

    // What the container does once createToken rejects.
    await form.rerender({ error: { messageId: "signIn:invalidCredentials" } });

    expect(form.find("input_pass")?.value).toBe("");
    expect(form.find("p_login_error")).not.toBeNull();

    form.unmount();
  });
});
