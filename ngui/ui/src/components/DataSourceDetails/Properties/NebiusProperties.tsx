import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { MPT_SPACING_2 } from "utils/layouts";

const NebiusProperties = ({ accountId, config }) => {
  const {
    cloud_name: cloudName,
    service_account_id: serviceAccountId,
    key_id: authorizedKeyId,
    access_key_id: accessKeyId,
    bucket_name: reportBucketName,
    bucket_prefix: reportPathPrefix
  } = config;

  return (
    <>
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="cloudId"
        value={accountId}
        dataTestIds={{ key: `p_key_cloud_id`, value: `p_value_cloud_id` }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="cloudName"
        value={cloudName}
        dataTestIds={{
          key: `p_key_cloud_name`,
          value: `p_value_cloud_name`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="serviceAccountId"
        value={serviceAccountId}
        dataTestIds={{
          key: `p_key_service_account_id`,
          value: `p_value_service_account_id`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="authorizedKeyId"
        value={authorizedKeyId}
        dataTestIds={{
          key: `p_key_authorized_key_id`,
          value: `p_value_authorized_key_id`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="accessKeyId"
        value={accessKeyId}
        dataTestIds={{
          key: `p_key_authorized_key_id`,
          value: `p_value_authorized_key_id`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="reportBucketName"
        value={reportBucketName}
        dataTestIds={{
          key: `p_key_bucket_name`,
          value: `p_value_bucket_name`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        sx={{ marginBottom: MPT_SPACING_2 }}
        keyMessageId="reportPathPrefix"
        value={reportPathPrefix}
        dataTestIds={{
          key: `p_key_bucket_prefix`,
          value: `p_value_bucket_prefix`
        }}
      />
    </>
  );
};

export default NebiusProperties;
