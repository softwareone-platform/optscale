import { ComponentProps, useState } from "react";
import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "tests/renderWithProviders";
import { typeInto } from "tests/typeInto";
import { rememberPasswordChanged } from "utils/passwordChangedNotice";
import TwoStepLoginForm from "./TwoStepLoginForm";

// Stubbed at the transport boundary only — LOGIN_METHOD stays real, so the form is still checked
// against the value the contract actually uses.
vi.mock("api/auth/signIn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("api/auth/signIn")>()),
  resolveLoginOptions: () => Promise.resolve({ methods: ["password"], sso: { state: "not_configured" } }),
}));

type FormProps = Partial<ComponentProps<typeof TwoStepLoginForm>>;

const render = () => {
  let passProps: (props: FormProps) => void = () => {};

  // Stands in for the container: it holds the props the form gets, so a spec can pass new ones later.
  const FormOwner = () => {
    const [props, setProps] = useState<FormProps>({});
    passProps = setProps;

    return <TwoStepLoginForm onSubmit={vi.fn()} {...props} />;
  };

  const { container, unmount } = renderWithProviders({
    initialEntry: "/",
    routes: <Route path="/" element={<FormOwner />} />,
  });

  const find = (testId: string) => container.querySelector<HTMLInputElement>(`[data-test-id='${testId}']`);

  const type = async (testId: string, value: string) => {
    const input = find(testId) as HTMLInputElement;

    await act(async () => {
      typeInto(input, value);
    });
  };

  return {
    find,
    type,
    unmount,
    rerender: async (nextProps: FormProps) => {
      await act(async () => {
        passProps(nextProps);
      });
    },
    typeEmail: (value: string) => type("input_email", value),
    submit: async () => {
      await act(async () => {
        container.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      });
    },
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

  it("says the password was changed on the first visit after the change, and not again", () => {
    rememberPasswordChanged();

    const first = render();
    const isNoticeShownFirst = first.find("p_password_changed") !== null;
    first.unmount();
    const second = render();

    expect(isNoticeShownFirst).toBe(true);
    expect(second.find("p_password_changed")).toBeNull();

    second.unmount();
  });
});
