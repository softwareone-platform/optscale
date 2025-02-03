import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { ALIBABA_CNR } from "utils/constants";
import { MPT_SPACING_2 } from "utils/layouts";

const AlibabaProperties = ({ accountId, config }) => {
  const { access_key_id: accessKeyId } = config;

  return (
    <>
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        key="alibabaAccountId"
        keyMessageId="alibabaAccountId"
        value={accountId}
        dataTestIds={{
          key: `p_${ALIBABA_CNR}_id`,
          value: `p_${ALIBABA_CNR}_value`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        key="alibabaAccessKeyId"
        keyMessageId="alibabaAccessKeyId"
        value={accessKeyId}
        dataTestIds={{ key: "p_access_key_key", value: "p_access_key_value" }}
      />
    </>
  );
};

export default AlibabaProperties;
