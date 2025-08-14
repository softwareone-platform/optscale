import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import AwsAssumedRoleCredentials from "../AwsAssumedRoleCredentials";
import AwsAssumedRolePolicies from "../AwsAssumedRolePolicies";
import AwsBillingBucket from "../AwsBillingBucket";
import AwsExportType from "../AwsExportType";
import AwsUseAwsEdpDiscount from "../AwsUseAwsEdpDiscount";

const AwsAssumedRoleInputs = ({
  readOnlyFields = [],
  fieldsRequiredForRoleFetch = []
}: {
  readOnlyFields?: string[];
  fieldsRequiredForRoleFetch: string[];
}) => (
  <>
    <AwsAssumedRoleCredentials readOnlyFields={readOnlyFields} />
    <AwsUseAwsEdpDiscount />
    <Typography gutterBottom data-test-id="p_cost_and_usage_report_parameters_description">
      <FormattedMessage id="costAndUsageReportParametersDescription" />
    </Typography>
    <AwsExportType />
    <AwsBillingBucket />
    <AwsAssumedRolePolicies fieldsRequiredForRoleFetch={fieldsRequiredForRoleFetch} />
  </>
);

export default AwsAssumedRoleInputs;
