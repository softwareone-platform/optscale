import { TODO } from "utils/types";

export type DataSourceProperties = {
  accountId?: string;
};

export type UpdateDataSourceCredentialsContainerProps = {
  id: string;
  type: string;
  config: TODO;
  dataSourceProps: DataSourceProperties;
  closeSideModal: () => void;
};

export type Config = {
  linked: boolean;
  assume_role_account_id: string;
  assume_role_name: string;
};

export type Params = {
  config: Config;
};
