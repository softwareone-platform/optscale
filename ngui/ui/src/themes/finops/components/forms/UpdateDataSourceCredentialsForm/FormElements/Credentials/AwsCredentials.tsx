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
import AwsAuthenticationTypeAlert from "./AwsAuthenticationTypeAlert";
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

  const fullAuthenticationType: string = authenticationType + (config.linked ? "Linked" : "");
  const getAwsInputs = (config) => {
    switch (fullAuthenticationType) {
      case "assumedRole":
      case "assumedRoleLinked": {
        // The API treats the external ID as immutable once the data source exists: any value that differs
        // from the stored one is rejected. Show a stored ID read-only, and hide the field when none is stored
        // (legacy assumed-role sources, or switching from access keys), since nothing could be saved there.
        const hasStoredExternalId = Boolean(config.assume_role_external_id);

        return (
          <AwsAssumedRoleInputs
            readOnlyFields={[
              AWS_ROLE_CREDENTIALS_FIELD_NAMES.ASSUME_ROLE_ACCOUNT_ID,
              AWS_ROLE_CREDENTIALS_FIELD_NAMES.ASSUME_ROLE_EXTERNAL_ID
            ]}
            hiddenFields={hasStoredExternalId ? [] : [AWS_ROLE_CREDENTIALS_FIELD_NAMES.ASSUME_ROLE_EXTERNAL_ID]}
            showAdvancedOptions={!config.linked}
          />
        );
      }
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
      {currentAuthType === AUTHENTICATION_TYPES.ACCESS_KEY && (
        <>
          <AuthenticationTypeSelector authenticationType={authenticationType} setAuthenticationType={setAuthenticationType} />
          <AwsAuthenticationTypeAlert authenticationType={fullAuthenticationType} />
        </>
      )}
      <AwsDescription authenticationType={fullAuthenticationType} />
      {getAwsInputs(config)}
    </>
  );
};

export default AwsCredentials;
