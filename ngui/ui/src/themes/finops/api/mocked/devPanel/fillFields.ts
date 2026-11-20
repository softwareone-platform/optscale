export const CREDENTIAL_FIELD_SELECTOR = Object.freeze({
  email: "input[name='email']",
  // The new-password form's two fields too, so a recovery keeps the mock's password.
  password: "input[name='password'], input[name='newPassword'], input[name='confirmPassword']",
  verification_code: "input[name='code']",
  // The first box spreads a whole code over the rest, as a paste does.
  mfa_code: "[data-test-id='input_code_digit_0']"
});

/** Types `value` into every editable match the way React sees typing — native setter, then `input`; returns the count. */
export const fillFields = (selector: string, value: string, root: Document | HTMLElement = document) => {
  const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  const fields = Array.from(root.querySelectorAll<HTMLInputElement>(selector)).filter(
    ({ readOnly, disabled }) => !readOnly && !disabled
  );

  for (const field of fields) {
    setValue?.call(field, value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  }

  return fields.length;
};
