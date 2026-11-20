import { LoginFormProps } from "@main/components/forms/LoginForm/types";
import { ObjectValues } from "utils/types";
import { LOGIN_STEP } from "./constants";

export type LoginStep = ObjectValues<typeof LOGIN_STEP>;

export type LoginFormError = {
  messageId: string;
};

export type TwoStepLoginFormProps = LoginFormProps & {
  /** A fresh object on every failed attempt, so a repeated failure still re-arms the password field. */
  error?: LoginFormError | null;
};
