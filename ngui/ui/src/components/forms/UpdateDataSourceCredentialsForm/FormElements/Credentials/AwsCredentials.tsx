import { useState } from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import {
  AwsAssumedRoleInputs,
  AwsBillingBucket,
  AwsExportType,
  AwsLinkedCredentials,
  AwsRootCredentials,
  AwsUseAwsEdpDiscount,
  AWS_ROLE_CREDENTIALS_FIELD_NAMES
} from "components/DataSourceCredentialFields";
import {
  AUTHENTICATION_TYPES,
  AuthenticationTypeSelector
} from "components/forms/ConnectCloudAccountForm/FormElements/AwsConnectionForm";
import AwsDescription from "./AwsDescription";

const CostAndUsageReport = () => (
  <>
    <Typography gutterBottom data-test-id="p_cost_and_usage_report_parameters_description">
      <FormattedMessage id="costAndUsageReportParametersDescription" />
    </Typography>
    <AwsExportType />
    <AwsBillingBucket />
  </>
);
const getAwsAuthType = (config) => {
  if (config.assume_role_account_id && config.assume_role_name) {
    return AUTHENTICATION_TYPES.ASSUMED_ROLE;
  }

  return AUTHENTICATION_TYPES.ACCESS_KEY;
};

const AwsCredentials = ({ config }) => {
  const currentAuthType = getAwsAuthType(config);
  const [authenticationType, setAuthenticationType] = useState<string>(currentAuthType);
  const getAwsInputs = (config) => {
    const fullAuthenticationType: string = authenticationType + (config.linked ? "Linked" : "");

    switch (fullAuthenticationType) {
      case "assumedRole":
      case "assumedRoleLinked":
        return (
          <AwsAssumedRoleInputs
            readOnlyFields={config.assume_role_account_id ? [AWS_ROLE_CREDENTIALS_FIELD_NAMES.ASSUME_ROLE_ACCOUNT_ID] : []}
            showAdvancedOptions={!config.linked}
          />
        );
      case "accessKeyLinked":
        return <AwsLinkedCredentials />;
      case "accessKey":
      default:
        return (
          <>
            <AwsRootCredentials />
            <AwsUseAwsEdpDiscount />
            <CostAndUsageReport />
          </>
        );
    }
  };
  return (
    <>
      <AuthenticationTypeSelector authenticationType={authenticationType} setAuthenticationType={setAuthenticationType} />
      <AwsDescription config={config} authenticationType={authenticationType} />
      {getAwsInputs(config)}
    </>
  );
};

export default AwsCredentials;
