import { FormattedMessage } from "react-intl";
import CopyText from "components/CopyText";
import CostModelFormattedMoney from "components/CostModelFormattedMoney";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { KUBERNETES_CNR } from "utils/constants";
import { K8sPropertiesProps } from "./types";

const K8sProperties = ({ id, accountId, config }: K8sPropertiesProps) => {
  const {
    cost_model: { cpu_hourly_cost: cpuHourlyCost, memory_hourly_cost: memoryHourlyCost } = {},
    user,
    custom_price: customPrice
  } = config;

  return (
    <>
      <KeyValueLabel
        variant="property"
        keyMessageId="kubernetesId"
        value={accountId}
        dataTestIds={{
          key: `p_${KUBERNETES_CNR}_id`,
          value: `p_${KUBERNETES_CNR}_value`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="dataSourceId"
        value={
          <CopyText sx={{ fontWeight: "inherit" }} text={id}>
            {id}
          </CopyText>
        }
        dataTestIds={{ key: "p_data_source_id", value: "value_data_source_id" }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="user"
        value={user}
        dataTestIds={{ key: "p_user_key", value: "p_user_value" }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="costModel"
        value={<FormattedMessage id={customPrice ? "default" : "flavorBased"} />}
        dataTestIds={{ key: "p_cost_model_key", value: "p_cost_model_value" }}
      />
      {customPrice && (
        <>
          <KeyValueLabel
            variant="property"
            keyMessageId="cpuPerHour"
            value={<CostModelFormattedMoney value={cpuHourlyCost} />}
            dataTestIds={{ key: "p_cpu_per_hour_key", value: "p_cpu_per_hour_value" }}
          />
          <KeyValueLabel
            variant="property"
            keyMessageId="memoryPerHour"
            value={<CostModelFormattedMoney value={memoryHourlyCost} />}
            dataTestIds={{ key: "p_memory_per_hour_key", value: "p_memory_per_hour_value" }}
          />
        </>
      )}
    </>
  );
};

export default K8sProperties;
