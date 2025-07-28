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
    <AwsExportType />
    <Typography gutterBottom data-test-id="p_data_export_detection_description">
      <FormattedMessage id="dataExportDetectionDescription1" />
    </Typography>
    <AwsBillingBucket />
    <AwsAssumedRolePolicies fieldsRequiredForRoleFetch={fieldsRequiredForRoleFetch} />
  </>
);

export default AwsAssumedRoleInputs;
