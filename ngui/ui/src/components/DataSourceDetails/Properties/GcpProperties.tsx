import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { GCP_CNR } from "utils/constants";
import { GcpPropertiesProps } from "./types";

const GcpProperties = ({ accountId, createdAt, config = {} }: GcpPropertiesProps) => {
  const { billing_data: billingData, pricing_data: pricingData } = config;
  const { dataset_name: billingDatasetName, table_name: billingTableName, project_id: billingProjectId } = billingData ?? {};
  const { dataset_name: pricingDatasetName, table_name: pricingTableName, project_id: pricingProjectId } = pricingData ?? {};

  return (
    <>
      <KeyValueLabel
        variant="property"
        keyMessageId="connectedAt"
        value={createdAt}
        dataTestIds={{
          key: `p_connected_at_id`,
          value: `p_connected_at_value`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="GCPProjectId"
        value={accountId}
        dataTestIds={{
          key: `p_${GCP_CNR}_id`,
          value: `p_${GCP_CNR}_value`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="billingDataDatasetName"
        value={billingDatasetName}
        dataTestIds={{ key: "p_billing_dataset_name_key", value: "p_billing_dataset_name_value" }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="billingDataTableName"
        value={billingTableName}
        dataTestIds={{ key: "p_billing_table_name_key", value: "p_billing_table_name_value" }}
      />
      {billingProjectId && (
        <KeyValueLabel
          variant="property"
          keyMessageId="billingDataProjectId"
          value={billingProjectId}
          dataTestIds={{ key: "p_billing_project_id_key", value: "p_billing_project_id_value" }}
        />
      )}
      {pricingDatasetName && (
        <KeyValueLabel
          variant="property"
          keyMessageId="pricingDataDatasetName"
          value={pricingDatasetName}
          dataTestIds={{ key: "p_pricing_dataset_name_key", value: "p_pricing_dataset_name_value" }}
        />
      )}
      {pricingTableName && (
        <KeyValueLabel
          variant="property"
          keyMessageId="pricingDataTableName"
          value={pricingTableName}
          dataTestIds={{ key: "p_pricing_table_name_key", value: "p_pricing_table_name_value" }}
        />
      )}
      {pricingProjectId && (
        <KeyValueLabel
          variant="property"
          keyMessageId="pricingDataProjectId"
          value={pricingProjectId}
          dataTestIds={{ key: "p_pricing_project_id_key", value: "p_pricing_project_id_value" }}
        />
      )}
    </>
  );
};

export default GcpProperties;
