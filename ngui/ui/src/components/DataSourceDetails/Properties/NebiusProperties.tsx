import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { NebiusPropertiesProps } from "./types";

const NebiusProperties = ({ accountId, config, createdAt }: NebiusPropertiesProps) => {
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
        variant="property"
        keyMessageId="connectedAt"
        value={createdAt}
        dataTestIds={{
          key: `p_connected_id`,
          value: `p_connected_value`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="cloudId"
        value={accountId}
        dataTestIds={{ key: `p_key_cloud_id`, value: `p_value_cloud_id` }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="cloudName"
        value={cloudName}
        dataTestIds={{
          key: `p_key_cloud_name`,
          value: `p_value_cloud_name`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="serviceAccountId"
        value={serviceAccountId}
        dataTestIds={{
          key: `p_key_service_account_id`,
          value: `p_value_service_account_id`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="authorizedKeyId"
        value={authorizedKeyId}
        dataTestIds={{
          key: `p_key_authorized_key_id`,
          value: `p_value_authorized_key_id`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="accessKeyId"
        value={accessKeyId}
        dataTestIds={{
          key: `p_key_authorized_key_id`,
          value: `p_value_authorized_key_id`
        }}
      />
      <KeyValueLabel
        variant="property"
        keyMessageId="reportBucketName"
        value={reportBucketName}
        dataTestIds={{
          key: `p_key_bucket_name`,
          value: `p_value_bucket_name`
        }}
      />
      <KeyValueLabel
        variant="property"
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
