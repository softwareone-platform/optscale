import { DataSourceProperties } from "containers/UpdateDataSourceCredentialsContainer/types";
import { TODO } from "utils/types";

export type UpdateDataSourceCredentialsFormProps = {
  id: string;
  type: string;
  config: TODO;
  dataSourceProps: DataSourceProperties;
  isLoading: boolean;
  onSubmit: (id: string, data: TODO) => void;
  onCancel: () => void;
};
