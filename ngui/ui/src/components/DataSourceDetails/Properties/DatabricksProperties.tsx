import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { DATABRICKS } from "utils/constants";
import { MPT_SPACING_2 } from "utils/layouts";

const DatabricksProperties = ({ accountId, config }) => {
  const { client_id: clientId } = config;

  return (
    <>
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="accountId"
        value={accountId}
        dataTestIds={{
          key: `p_${DATABRICKS}_id`,
          value: `p_${DATABRICKS}_value`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="clientId"
        value={clientId}
        dataTestIds={{
          key: "p_client_id_key",
          value: "p_client_id_value"
        }}
      />
    </>
  );
};

export default DatabricksProperties;
