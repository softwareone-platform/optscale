import React from "react";
import { FormattedMessage } from "react-intl";
import { TextInput } from "components/forms/common/fields";
import QuestionMark from "components/QuestionMark";
import { FIELD_NAMES } from "./AwsFieldNames";

const GroupAwsRootCredentials = () => (
  <>
    <TextInput
      name={FIELD_NAMES.ACCESS_KEY_ID}
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
      name={FIELD_NAMES.ASSUMED_ROLE_NAME}
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

export default GroupAwsRootCredentials;
