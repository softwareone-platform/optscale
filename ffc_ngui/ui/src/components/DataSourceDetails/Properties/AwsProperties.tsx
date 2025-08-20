import { FormattedMessage } from "react-intl";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { AWS_CNR, AWS_ROOT_CONNECT_CUR_VERSION, AWS_ROOT_CONNECT_CUR_VERSION_MESSAGE_ID } from "utils/constants";

type AwsPropertiesProps = {
  accountId: string;
  config: {
    access_key_id: string;
    assume_role_account_id: string;
    assume_role_name: string;
    bucket_name: string;
    bucket_prefix: string;
    linked: boolean;
    report_name: string;
    config_scheme?: string;
    region_name?: string;
    cur_version?: 1 | 2;
    use_edp_discount?: boolean;
  };
};

const AwsProperties = ({ accountId, config }: AwsPropertiesProps) => {
  const {
    access_key_id: accessKeyId,
    assume_role_account_id: assumeRoleAccountId,
    assume_role_name: assumeRoleName,
    bucket_name: bucketName,
    bucket_prefix: bucketPrefix,
    linked,
    cur_version: curVersion,
    report_name: reportName,
    use_edp_discount: useEdpDiscount,
    region_name: regionName
  } = config;

  const isAssumeRole = Boolean(assumeRoleAccountId && assumeRoleName);

  const getAwsAccountTypeMessageId = () => {
    if (linked) {
      return "linked";
    }

    if (isAssumeRole) {
      return "assumedRole";
    }

    return "root";
  };

  return (
    <>
      <KeyValueLabel
        isBoldKeyLabel
        variant="property"
        keyMessageId="AWSAccountId"
        value={accountId}
        dataTestIds={{
          key: `p_${AWS_CNR}_id`,
          value: `p_${AWS_CNR}_value`
        }}
      />
      <KeyValueLabel
        isBoldKeyLabel
        variant="property"
        keyMessageId="awsAccountType"
        value={<FormattedMessage id={getAwsAccountTypeMessageId()} />}
        dataTestIds={{
          key: `p_${AWS_CNR}_key`,
          value: `p_${AWS_CNR}_value`
        }}
      />
      {isAssumeRole && (
        <KeyValueLabel
          isBoldKeyLabel
          variant="property"
          keyMessageId="awsRoleName"
          value={assumeRoleName}
          dataTestIds={{ key: "p_assume_role_name_key", value: "p_assume_role_name_value" }}
        />
      )}
      {!isAssumeRole && (
        <KeyValueLabel
          isBoldKeyLabel
          variant="property"
          keyMessageId="awsAccessKeyId"
          value={accessKeyId}
          dataTestIds={{ key: "p_access_key_key", value: "p_access_key_value" }}
        />
      )}
      {curVersion && Object.values(AWS_ROOT_CONNECT_CUR_VERSION).includes(curVersion) ? (
        <KeyValueLabel
          isBoldKeyLabel
          variant="property"
          keyMessageId="exportType"
          value={<FormattedMessage id={AWS_ROOT_CONNECT_CUR_VERSION_MESSAGE_ID[curVersion]} />}
          dataTestIds={{ key: "p_cur_version_key", value: "p_cur_version_value" }}
        />
      ) : null}
      {!linked && (
        <>
          <KeyValueLabel
            isBoldKeyLabel
            variant="property"
            keyMessageId="useAwsEdpDiscount"
            value={<FormattedMessage id={useEdpDiscount ? "yes" : "no"} />}
            dataTestIds={{ key: "p_use_edp_discount_key", value: "p_use_edp_discount_value" }}
          />
          <KeyValueLabel
            isBoldKeyLabel
            variant="property"
            keyMessageId="exportName"
            value={reportName}
            dataTestIds={{ key: "p_export_name_key", value: "p_export_name_value" }}
          />
          <KeyValueLabel
            isBoldKeyLabel
            variant="property"
            keyMessageId="exportS3BucketName"
            value={bucketName}
            dataTestIds={{ key: "p_bucket_name_key", value: "p_bucket_name_value" }}
          />
          <KeyValueLabel
            isBoldKeyLabel
            variant="property"
            keyMessageId="exportPathPrefix"
            value={bucketPrefix}
            dataTestIds={{ key: "p_bucket_prefix_key", value: "p_bucket_prefix_value" }}
          />
          {!!regionName && (
            <KeyValueLabel
              keyMessageId="exportRegionName"
              value={regionName}
              dataTestIds={{ key: "p_region_name_key", value: "p_region_name_value" }}
            />
          )}
        </>
      )}
    </>
  );
};

export default AwsProperties;
