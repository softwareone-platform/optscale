export type K8sPropertiesProps = {
  id: string;
  accountId: string;
  config: K8sConfig;
};

type K8sConfig = {
  user: string;
  custom_price: boolean;
  cost_model: K8sConstModel;
};

type K8sConstModel = {
  cpu_hourly_cost: number;
  memory_hourly_cost: number;
};
