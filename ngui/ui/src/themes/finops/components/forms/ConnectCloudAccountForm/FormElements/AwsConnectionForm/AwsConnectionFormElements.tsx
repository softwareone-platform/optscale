import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MPT_SPACING_2 } from "@theme/utils/layouts";
import ButtonGroup from "components/ButtonGroup";
import {
  AUTHENTICATION_TYPES,
  authenticationTypes,
  awsConnectionAssumedRoleDescriptions,
  awsConnectionKeyAccessDescriptions
} from "./constants";
import { AuthenticationType, AuthenticationTypeSelectorType } from "./types";

export { AwsTypeDescription } from "./AwsTypeDescription";

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

export const getAwsConnectionTypeDescriptions = (authenticationType: AuthenticationType) =>
  authenticationType === AUTHENTICATION_TYPES.ASSUMED_ROLE
    ? awsConnectionAssumedRoleDescriptions
    : awsConnectionKeyAccessDescriptions;
