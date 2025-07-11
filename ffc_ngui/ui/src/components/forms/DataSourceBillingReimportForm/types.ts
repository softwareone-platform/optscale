import { FIELD_NAMES } from "./constants";

export type FormValues = {
  [FIELD_NAMES.IMPORT_FROM]: number;
};

export type DataSourceBillingReimportFormProps = {
  onSubmit: (data: FormValues) => void;
  isSubmitLoading?: boolean;
};
