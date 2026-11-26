import { act } from "react-dom/test-utils";
import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { click, find } from "tests/dom";
import { renderWithProviders } from "tests/renderWithProviders";
import { typeInto } from "tests/typeInto";
import { PASSWORD_RECOVERY } from "urls";
import RecoveryCodeForm from "./RecoveryCodeForm";

const onSubmitSpy = vi.fn();

// Upstream's resend link talks to the redux REST layer; the form only places it.
vi.mock("containers/SendVerificationCodeAgainContainer", () => ({
  default: () => <div data-test-id="stub_send_code_again" />,
}));

const renderForm = (search = "?email=finops.ffc%40example.com") => {
  // Upstream reads the query off window.location, not the router.
  window.history.replaceState(null, "", `${PASSWORD_RECOVERY}${search}`);

  return renderWithProviders({
    initialEntry: `${PASSWORD_RECOVERY}${search}`,
    routes: <Route path={PASSWORD_RECOVERY} element={<RecoveryCodeForm onSubmit={onSubmitSpy} />} />,
  });
};

const digits = () => Array.from(document.querySelectorAll<HTMLInputElement>("[data-test-id^='input_code_digit_']"));

let screen: ReturnType<typeof renderForm> | null = null;

describe("RecoveryCodeForm", () => {
  afterEach(() => {
    screen?.unmount();
    screen = null;
    vi.clearAllMocks();
  });

  it("takes the code in six boxes, beside upstream's resend link", () => {
    screen = renderForm();

    expect(digits()).toHaveLength(6);
    expect(find("stub_send_code_again")).not.toBeNull();
  });

  it("confirms only a whole code, and hands it over as upstream's form did", async () => {
    screen = renderForm();

    act(() => typeInto(find("input_code_digit_0") as HTMLInputElement, "12345"));
    expect((find("btn_confirm_code") as HTMLButtonElement).disabled).toBe(true);

    act(() => typeInto(find("input_code_digit_5") as HTMLInputElement, "6"));
    await click("btn_confirm_code");

    expect(onSubmitSpy).toHaveBeenCalledWith({ code: "123456" });
  });

  it("fills in a code the link carries", () => {
    screen = renderForm("?email=finops.ffc%40example.com&code=012345");

    expect(digits().map((input) => input.value)).toEqual(["0", "1", "2", "3", "4", "5"]);
  });
});
