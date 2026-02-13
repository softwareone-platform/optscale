import { TODO } from "utils/types";

export type UpdateDataSourceCredentialsFormProps = {
  id: string;
  type: string;
  config: TODO;
  isLoading: boolean;
  onSubmit: (id: string, data: TODO) => void;
  onCancel: () => void;
};
