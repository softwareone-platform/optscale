import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import ButtonGroup from "components/ButtonGroup";
import { MPT_SPACING_2 } from "utils/layouts";
import {
  awsConnectionAssumedRoleTypeDescriptions,
  awsConnectionKeyAccessTypeDescriptions
} from "../constants/AwsConnectionInfoMessage";
import { AUTHENTICATION_TYPES, authenticationTypes } from "../constants/AwsConstants";
import { AuthenticationType, AuthenticationTypeSelectorType } from "../types/AwsForm.types";

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
    <Typography minWidth={110} sx={{ mr: 1, fontWeight: "bold" }}>
      <FormattedMessage id="authentication" />{" "}
    </Typography>
    <ButtonGroup
      buttons={authenticationTypes.map((subtype) => ({
        id: subtype.authenticationType,
        messageId: subtype.messageId,
        dataTestId: `btn_${subtype.messageId}`,
        action: () => setAuthenticationType(subtype.authenticationType)
      }))}
      activeButtonId={authenticationType}
      activeButtonIndex={undefined}
      fullWidth={false}
      onButtonClick={undefined}
    />
  </Box>
);
