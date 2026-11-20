import { useState } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { describe, expect, it } from "vitest";
import intlConfig from "translations/react-intl-config";
import VerificationCodeInput from "./VerificationCodeInput";

// Opts this file into React 18's act() environment so state updates are flushed, not warned about.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const ControlledInput = ({ initialValue }: { initialValue: string }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <VerificationCodeInput value={value} onChange={setValue} />
      <output data-test-id="value">{value}</output>
    </>
  );
};

const render = (initialValue = "") => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <IntlProvider {...intlConfig}>
        <ControlledInput initialValue={initialValue} />
      </IntlProvider>
    );
  });

  const digit = (index: number) => container.querySelector<HTMLInputElement>(`[data-test-id='input_code_digit_${index}']`)!;

  return {
    digit,
    value: () => container.querySelector("[data-test-id='value']")!.textContent,
    type: (index: number, text: string) =>
      act(() => {
        const { set } = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!;
        set!.call(digit(index), text);
        digit(index).dispatchEvent(new Event("input", { bubbles: true }));
      }),
    paste: (index: number, text: string) =>
      act(() => {
        const event = new Event("paste", { bubbles: true, cancelable: true });
        Object.assign(event, { clipboardData: { getData: () => text } });
        digit(index).dispatchEvent(event);
      }),
    pressBackspace: (index: number) =>
      act(() => {
        digit(index).dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
      }),
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    }
  };
};

describe("VerificationCodeInput", () => {
  it("renders one labelled box per digit", () => {
    const input = render();

    expect(input.digit(5)).not.toBeNull();
    expect(input.digit(0).getAttribute("aria-label")).toBe("Digit 1 of 6");

    input.unmount();
  });

  it("moves to the next box after a digit is typed", () => {
    const input = render();

    input.type(0, "4");

    expect(input.value()).toBe("4");
    expect(document.activeElement).toBe(input.digit(1));

    input.unmount();
  });

  it("ignores anything that is not a digit", () => {
    const input = render();

    input.type(0, "a");

    expect(input.value()).toBe("");

    input.unmount();
  });

  it("spreads a pasted code across the boxes, dropping separators and anything past the last box", () => {
    const input = render();

    input.paste(0, "482-913 7");

    expect(input.value()).toBe("482913");

    input.unmount();
  });

  it("takes a whole code autofilled into the first box", () => {
    const input = render();

    input.type(0, "482913");

    expect(input.value()).toBe("482913");

    input.unmount();
  });

  it("writes into the first empty box when a later box is typed into, so the code has no gaps", () => {
    const input = render("4");

    input.type(4, "8");

    expect(input.value()).toBe("48");
    expect(document.activeElement).toBe(input.digit(2));

    input.unmount();
  });

  it("clears the previous digit when backspace is pressed on an empty box", () => {
    const input = render("48");

    input.pressBackspace(2);

    expect(input.value()).toBe("4");
    expect(document.activeElement).toBe(input.digit(1));

    input.unmount();
  });
});
