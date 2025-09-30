export type Config = {
  linked: boolean;
  assume_role_account_id: string;
  assume_role_name: string;
};

export type Params = {
  name: string;
  type: string;
  config: Config;
};
