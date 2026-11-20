import { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent, useRef } from "react";
import Stack from "@mui/material/Stack";
import { useIntl } from "react-intl";
import { SPACING_2 } from "utils/layouts";
import { VERIFICATION_CODE_LENGTH } from "./constants";
import useStyles from "./VerificationCodeInput.styles";

type VerificationCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
};

const onlyDigits = (text: string) => text.replace(/\D/g, "");

/** One box per digit. The value is kept contiguous, so the string is always the code as typed. */
const VerificationCodeInput = ({
  value,
  onChange,
  length = VERIFICATION_CODE_LENGTH,
  autoFocus = false,
  disabled = false
}: VerificationCodeInputProps) => {
  const { classes } = useStyles();
  const intl = useIntl();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusDigit = (index: number) => inputRefs.current[Math.min(Math.max(index, 0), length - 1)]?.focus();

  const fillFrom = (index: number, text: string) => {
    const typedDigits = onlyDigits(text);

    if (!typedDigits) {
      return;
    }

    // Typing into a box past the first empty one lands in the first empty one, so no hole opens up.
    const startIndex = Math.min(index, value.length);

    onChange((value.slice(0, startIndex) + typedDigits + value.slice(startIndex + typedDigits.length)).slice(0, length));
    focusDigit(startIndex + typedDigits.length);
  };

  // Selecting on focus makes a keystroke replace the digit, so onChange only ever sees new input.
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => event.target.select();

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => fillFrom(index, event.target.value);

  const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    fillFrom(index, event.clipboardData.getData("text"));
  };

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();

      const isDigitFilled = index < value.length;
      const removedIndex = isDigitFilled ? index : value.length - 1;

      if (removedIndex >= 0) {
        onChange(value.slice(0, removedIndex) + value.slice(removedIndex + 1));
        focusDigit(removedIndex);
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusDigit(index - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusDigit(index + 1);
    }
  };

  return (
    <Stack direction="row" spacing={SPACING_2} justifyContent="center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          className={classes.digit}
          value={value[index] ?? ""}
          onChange={handleChange(index)}
          onFocus={handleFocus}
          onPaste={handlePaste(index)}
          onKeyDown={handleKeyDown(index)}
          inputMode="numeric"
          // Lets mobile keyboards offer the code from an SMS or e-mail; it lands whole in the first box.
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          aria-label={intl.formatMessage({ id: "signIn:verificationCodeDigit" }, { position: index + 1, length })}
          data-test-id={`input_code_digit_${index}`}
        />
      ))}
    </Stack>
  );
};

export default VerificationCodeInput;
