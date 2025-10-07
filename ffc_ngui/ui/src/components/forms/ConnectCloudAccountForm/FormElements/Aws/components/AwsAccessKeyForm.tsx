import React from "react";
import { FieldValues } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { TextInput } from "components/forms/common/fields";
import QuestionMark from "components/QuestionMark";
import { AWS_ACCESS_KEY_FIELD_NAMES } from "../constants/AwsConstants";

export const AwsAccessKeyForm = () => (
  <>
    <TextInput
      name={AWS_ACCESS_KEY_FIELD_NAMES.ACCESS_KEY_ID}
      required
      dataTestId="input_aws_access_key_id"
      InputProps={{
        endAdornment: (
          <QuestionMark
            messageId="awsAccessKeyIdTooltip"
            messageValues={{
              i: (chunks: React.ReactNode) => <i>{chunks}</i>
            }}
            dataTestId="qmark_access_key"
          />
        )
      }}
      label={<FormattedMessage id="awsAccessKeyId" />}
      autoComplete="off"
    />
    <TextInput
      name={AWS_ACCESS_KEY_FIELD_NAMES.AWS_SECRET_ACCESS_KEY}
      required
      dataTestId="input_aws_secret_access_key"
      InputProps={{
        endAdornment: (
          <QuestionMark
            messageId="awsSecretAccessKeyTooltip"
            messageValues={{
              i: (chunks) => <i>{chunks}</i>
            }}
            dataTestId="qmark_secret_access_key"
          />
        )
      }}
      label={<FormattedMessage id="awsSecretAccessKey" />}
      autoComplete="off"
    />
  </>
);

export const getAwsGroupAccessKeyParameters = (formData: FieldValues) => ({
  access_key_id: formData[AWS_ACCESS_KEY_FIELD_NAMES.ACCESS_KEY_ID],
  secret_access_key: formData[AWS_ACCESS_KEY_FIELD_NAMES.AWS_SECRET_ACCESS_KEY]
});
