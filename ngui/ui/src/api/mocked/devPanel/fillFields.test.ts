import { describe, expect, it } from "vitest";
import { fillFields } from "./fillFields";

const buildForm = (html: string) => {
  const form = document.createElement("form");
  form.innerHTML = html;
  return form;
};

describe("fillFields", () => {
  it("fills every editable match and fires the input event React listens to", () => {
    const form = buildForm("<input name='newPassword'><input name='confirmPassword'>");
    const events: string[] = [];
    form.addEventListener("input", (event) => events.push((event.target as HTMLInputElement).name));

    const filled = fillFields("input[name='newPassword'], input[name='confirmPassword']", "password", form);

    expect(filled).toBe(2);
    expect(Array.from(form.querySelectorAll("input"), ({ value }) => value)).toEqual(["password", "password"]);
    expect(events).toEqual(["newPassword", "confirmPassword"]);
  });

  it("leaves a read-only field alone, like the address on the password step", () => {
    const form = buildForm("<input name='email' readonly value='reto@example.com'>");

    expect(fillFields("input[name='email']", "finops.ffc@example.com", form)).toBe(0);
    expect(form.querySelector("input")!.value).toBe("reto@example.com");
  });
});
