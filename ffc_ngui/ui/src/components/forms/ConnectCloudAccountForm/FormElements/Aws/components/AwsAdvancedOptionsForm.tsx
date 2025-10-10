import Typography from "@mui/material/Typography";
import { FieldValues } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import ConnectForm from "components/ConnectForm";
import {
  AwsRootUseAwsEdpDiscount,
  AwsRootExportType,
  AwsRootBillingBucket,
  AWS_ROOT_BILLING_BUCKET_FIELD_NAMES,
  AWS_ROOT_CREDENTIALS_FIELD_NAMES,
  AWS_ROOT_USE_AWS_EDP_DISCOUNT_FIELD_NAMES,
  AWS_ROOT_EXPORT_TYPE_FIELD_NAMES
} from "components/DataSourceCredentialFields";
import QuestionMark from "components/QuestionMark";
import { AWS_ROOT_CONNECT_CONFIG_SCHEMES } from "utils/constants";
import { RadioGroup, Switch } from "../../../../common/fields";
import { AWS_ROOT_INPUTS_FIELD_NAMES } from "../constants/AwsConstants";
import { AwsWatcherType } from "../types/AwsForm.types";

export const AwsAdvancedOptionsForm = () => (
  <ConnectForm>
    {({ watch }: AwsWatcherType) => {
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

export const getAwsAdvancedOptions = (formData: FieldValues) =>
  formData.isFindReport
    ? {
        config_scheme: AWS_ROOT_INPUTS_FIELD_NAMES.IS_FIND_REPORT
      }
    : {
        bucket_name: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.BUCKET_NAME],
        bucket_prefix: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.BUCKET_PREFIX],
        report_name: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.EXPORT_NAME],
        region_name: formData[AWS_ROOT_BILLING_BUCKET_FIELD_NAMES.REGION_NAME] || undefined,
        config_scheme: formData[AWS_ROOT_INPUTS_FIELD_NAMES.CONFIG_SCHEME],
        access_key_id: formData[AWS_ROOT_CREDENTIALS_FIELD_NAMES.ACCESS_KEY_ID],
        secret_access_key: formData[AWS_ROOT_CREDENTIALS_FIELD_NAMES.SECRET_ACCESS_KEY],
        use_edp_discount: formData[AWS_ROOT_USE_AWS_EDP_DISCOUNT_FIELD_NAMES.USE_EDP_DISCOUNT],
        cur_version: Number(formData[AWS_ROOT_EXPORT_TYPE_FIELD_NAMES.CUR_VERSION])
      };
