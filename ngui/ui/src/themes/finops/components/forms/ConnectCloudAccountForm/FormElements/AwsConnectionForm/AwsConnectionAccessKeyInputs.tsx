import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import ConnectForm from "components/ConnectForm";
import {
  AwsBillingBucket,
  AwsExportType,
  AwsRootCredentials,
  AwsUseAwsEdpDiscount
} from "components/DataSourceCredentialFields";
import { AWS_ROOT_INPUTS_FIELD_NAMES } from "./constants";

export const AwsConnectionAccessKeyInputs = ({ showAdvancesOptions = true }) => (
  <ConnectForm>
    {({ watch }) => {
      const isFindReportWatch = watch(AWS_ROOT_INPUTS_FIELD_NAMES.IS_FIND_REPORT, false);

      return (
        <>
          <AwsRootCredentials />
          {showAdvancesOptions && (
            <>
              <AwsUseAwsEdpDiscount />
              <Typography gutterBottom data-test-id="p_cost_and_usage_report_parameters_description">
                <FormattedMessage id="costAndUsageReportParametersDescription" />
              </Typography>
              <AwsExportType />
              {!isFindReportWatch && <AwsBillingBucket />}
            </>
          )}
        </>
      );
    }}
  </ConnectForm>
);
