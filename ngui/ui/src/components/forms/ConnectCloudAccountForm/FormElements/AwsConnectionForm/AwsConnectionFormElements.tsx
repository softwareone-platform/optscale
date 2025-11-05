import React, { ReactNode, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import ButtonGroup from "../../../../ButtonGroup";
import {
  AUTHENTICATION_TYPES,
  authenticationTypes,
  awsConnectionAssumedRoleDescriptions,
  awsConnectionKeyAccessDescriptions
} from "./AwsConnectionForm.constants";
import useStyles from "./AwsConnectionForm.styles";
import { AuthenticationType, AuthenticationTypeSelectorType, AwsTypeDescriptionProps } from "./AwsConnectionForm.types";

export const AwsTypeDescription = ({ messageId, linkUrl, linkDisplayBlock = false }: AwsTypeDescriptionProps) => {
  const { classes } = useStyles();

  return (
    <div key={messageId} className={classes.description}>
      <FormattedMessage
        id={messageId}
        values={{
          link: (chunks: ReactNode[]) => {
            const linkText = chunks.length > 0 ? chunks : linkUrl;
            return (
              <Link
                data-test-id="link_guide"
                style={{ display: linkDisplayBlock ? classes.linkInline : classes.linkBlock }}
                href={linkUrl}
                target="_blank"
                rel="noopener"
              >
                {linkText}
              </Link>
            );
          },
          strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
          warning: (chunks: ReactNode) => <Alert severity="warning">{chunks}</Alert>
        }}
      />
    </div>
  );
};

export const useAuthenticationType = () => {
  const [authenticationType, setAuthenticationType] = useState<AuthenticationType>(() => AUTHENTICATION_TYPES.ASSUMED_ROLE);
  return { authenticationType, setAuthenticationType };
};

export const AuthenticationTypeSelector = ({ authenticationType, setAuthenticationType }: AuthenticationTypeSelectorType) => {
  const { classes } = useStyles();

  return (
    <Box alignItems="center" display="flex">
      <Typography className={classes.authenticationLabel}>
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
      />
    </Box>
  );
};

export const getAwsConnectionTypeDescriptions = (authenticationType: AuthenticationType) =>
  authenticationType === AUTHENTICATION_TYPES.ASSUMED_ROLE
    ? awsConnectionAssumedRoleDescriptions
    : awsConnectionKeyAccessDescriptions;
