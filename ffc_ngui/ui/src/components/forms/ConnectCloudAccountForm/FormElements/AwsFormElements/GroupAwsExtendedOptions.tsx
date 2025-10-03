import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import ConnectForm from "components/ConnectForm";
import { AwsRootUseAwsEdpDiscount, AwsRootExportType, AwsRootBillingBucket } from "components/DataSourceCredentialFields";
import { AWS_ROOT_CONNECT_CONFIG_SCHEMES } from "../../../../../utils/constants";
import QuestionMark from "../../../../QuestionMark";
import { RadioGroup, Switch } from "../../../common/fields";
import { AWS_ROOT_INPUTS_FIELD_NAMES, WatcherType } from "./AwsFieldNames";

export const GroupAwsExtendedOptions = () => (
  <ConnectForm>
    {({ watch }: WatcherType) => {
      const isFindReportWatch = watch(AWS_ROOT_INPUTS_FIELD_NAMES.IS_FIND_REPORT, true);
      const configScheme =
        watch(AWS_ROOT_INPUTS_FIELD_NAMES.CONFIG_SCHEME, AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT) ||
        AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT;
      return (
        <>
          <AwsRootUseAwsEdpDiscount />
          <AwsRootExportType />
          <Switch
            name={AWS_ROOT_INPUTS_FIELD_NAMES.IS_FIND_REPORT}
            label={<FormattedMessage id="dataExportDetection" />}
            defaultValue={isFindReportWatch as boolean}
            adornment={
              <QuestionMark
                messageId="dataExportDetectionTooltip"
                messageValues={{
                  break: "\n"
                }}
                dataTestId="qmark_user_report"
              />
            }
          />
          {!isFindReportWatch && (
            <>
              <RadioGroup
                name={AWS_ROOT_INPUTS_FIELD_NAMES.CONFIG_SCHEME}
                defaultValue={configScheme as string}
                radioButtons={[
                  {
                    value: AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT,
                    label: <FormattedMessage id="createNewCostUsageReport" />
                  },
                  {
                    value: AWS_ROOT_CONNECT_CONFIG_SCHEMES.BUCKET_ONLY,
                    label: <FormattedMessage id="connectOnlyToDataInBucket" />
                  }
                ]}
              />
              <Typography gutterBottom data-test-id="p_data_export_detection_description">
                <FormattedMessage
                  id={
                    configScheme === AWS_ROOT_CONNECT_CONFIG_SCHEMES.CREATE_REPORT
                      ? "dataExportDetectionDescription1"
                      : "dataExportDetectionDescription2"
                  }
                />
              </Typography>
              <AwsRootBillingBucket />
            </>
          )}
        </>
      );
    }}
  </ConnectForm>
);
