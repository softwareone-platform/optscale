import React from "react";
import { FieldValues } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { TextInput } from "components/forms/common/fields";
import QuestionMark from "components/QuestionMark";
import { AWS_ASSUMED_ROLE_FIELD_NAMES } from "../constants/AwsConstants";

const GroupAwsRootCredentials = () => (
  <>
    <TextInput
      name={AWS_ASSUMED_ROLE_FIELD_NAMES.ACCOUNT_ID}
      required
      dataTestId="input_aws_account_id"
      InputProps={{
        endAdornment: (
          <QuestionMark
            messageId="awsAccountIdTooltip"
            messageValues={{
              i: (chunks: React.ReactNode) => <i>{chunks}</i>
            }}
            dataTestId="qmark_acount_id"
          />
        )
      }}
      label={<FormattedMessage id="awsAccountId" />}
      autoComplete="off"
    />
    <TextInput
      name={AWS_ASSUMED_ROLE_FIELD_NAMES.ASSUMED_ROLE_NAME}
      required
      dataTestId="input_assumed_role_name"
      InputProps={{
        endAdornment: (
          <QuestionMark
            messageId="awsAssumedRoleNameTooltip"
            messageValues={{
              i: (chunks) => <i>{chunks}</i>
            }}
            dataTestId="qmark_assumed_role_key"
          />
        )
      }}
      label={<FormattedMessage id="awsAssumedRoleName" />}
      autoComplete="off"
    />
  </>
);

export const getAwsAssumedRoleParameters = (formData: FieldValues) => ({
  assume_role_account_id: formData[AWS_ASSUMED_ROLE_FIELD_NAMES.ACCOUNT_ID],
  assume_role_name: formData[AWS_ASSUMED_ROLE_FIELD_NAMES.ASSUMED_ROLE_NAME],
  linked: true
});

export default GroupAwsRootCredentials;
