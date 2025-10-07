import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FieldValues } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import ConnectForm from "components/ConnectForm";
import { AWS_CNR, CONNECTION_TYPES } from "../../../../../utils/constants";
import { MPT_SPACING_2 } from "../../../../../utils/layouts";
import ButtonGroup from "../../../../ButtonGroup";
import { FIELD_NAME as DATA_SOURCE_NAME_FIELD_NAME } from "../DataSourceNameField";
import { AwsAccessKeyForm, getAwsGroupAccessKeyParameters } from "./components/AwsAccessKeyForm";
import { AwsAdvancedOptionsForm, getAwsAdvancedOptions } from "./components/AwsAdvancedOptionsForm";
import GroupAwsAssumedRole, { getAwsAssumedRoleParameters } from "./components/AwsAssumedRoleForm";
import {
  awsConnectionAssumedRoleTypeDescriptions,
  awsConnectionKeyAccessTypeDescriptions
} from "./constants/AwsConnectionInfoMessage";
import { AUTHENTICATION_TYPES, authenticationTypes } from "./constants/AwsConstants";
import { AuthenticationType, AuthenticationTypeSelectorType, FormAwsAssumeRoleExtendedProps } from "./types/AwsForm.types";

export const AwsForm = ({ authenticationType = null, connectionType }: FormAwsAssumeRoleExtendedProps) => (
  <ConnectForm>
    {() => (
      <>
        {authenticationType === AUTHENTICATION_TYPES.ASSUMED_ROLE ? <GroupAwsAssumedRole /> : <AwsAccessKeyForm />}
        {(connectionType === CONNECTION_TYPES.AWS_MANAGEMENT || connectionType === CONNECTION_TYPES.AWS_STANDALONE) && (
          <AwsAdvancedOptionsForm />
        )}
      </>
    )}
  </ConnectForm>
);

export const awsGetFormParameters = (
  formData: FieldValues,
  connectionType: string,
  authenticationType: AuthenticationType
) => ({
  name: formData[DATA_SOURCE_NAME_FIELD_NAME],
  type: AWS_CNR,
  config: {
    ...(authenticationType === AUTHENTICATION_TYPES.ASSUMED_ROLE
      ? getAwsAssumedRoleParameters(formData)
      : getAwsGroupAccessKeyParameters(formData)),
    ...(connectionType !== CONNECTION_TYPES.AWS_MEMBER ? getAwsAdvancedOptions(formData) : {})
  }
});

export const getAwsConnectionTypeDescriptions = (authenticationType: AuthenticationType) =>
  authenticationType === AUTHENTICATION_TYPES.ASSUMED_ROLE
    ? awsConnectionAssumedRoleTypeDescriptions
    : awsConnectionKeyAccessTypeDescriptions;

export const useAuthenticationType = () => {
  const [authenticationType, setAuthenticationType] = useState<AuthenticationType>(() => AUTHENTICATION_TYPES.ASSUMED_ROLE);
  return { authenticationType, setAuthenticationType };
};

export const AuthenticationTypeSelector = ({ authenticationType, setAuthenticationType }: AuthenticationTypeSelectorType) => (
  <Box alignItems="center" display="flex" mb={MPT_SPACING_2}>
    <Typography minWidth={110} sx={{ mr: 1 }}>
      <FormattedMessage id="authentication" />{" "}
    </Typography>
    <ButtonGroup
      buttons={authenticationTypes.map((subtype) => ({
        id: subtype.authenticationType,
        messageId: subtype.messageId,
        action: () => setAuthenticationType(subtype.authenticationType)
      }))}
      activeButtonId={authenticationType}
      activeButtonIndex={undefined}
      fullWidth={false}
      onButtonClick={undefined}
    />
  </Box>
);
