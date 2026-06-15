import { Alert } from "@mui/material";
import { FormattedMessage } from "react-intl";

const SuspendedAlert = () => (
  <Alert severity="error">
    <FormattedMessage id="organizationSubscriptionSuspended" />
  </Alert>
);

export default SuspendedAlert;
