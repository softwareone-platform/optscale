import { FormEvent, useState } from "react";
import { VERIFICATION_CODE_LENGTH } from "./constants";

/** The code being typed in a form, and the submit that hands it to `onVerify`. */
export const useVerificationCodeEntry = (onVerify: (code: string) => void) => {
  const [code, setCode] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onVerify(code);
  };

  return { code, setCode, isCodeComplete: code.length >= VERIFICATION_CODE_LENGTH, handleSubmit };
};
