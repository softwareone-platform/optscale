import { FIELD_NAMES } from "./constants";

export type FormValues = {
  [FIELD_NAMES.EMAIL]: string;
  [FIELD_NAMES.NEW_PASSWORD]: string;
  [FIELD_NAMES.CONFIRM_PASSWORD]: string;
};

export type CreateNewPasswordFormProps = {
  onSubmit: (data: FormValues) => void;
  isLoading?: boolean;
  /** The account being recovered; without it the form reads `?email=` off the URL, as upstream does. */
  email?: string;
};
