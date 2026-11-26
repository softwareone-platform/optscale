import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN } from "urls";

/** Leaves the sign-in steps for the login page — "Back", "Sign out" where no session exists yet, or "Sign in again". */
const BackToLoginLink = ({ to = LOGIN, messageId = "back", dataTestId = "btn_back_to_login" }) => (
  <Box display="flex" justifyContent="center">
    <Link component={RouterLink} to={to} color="primary" data-test-id={dataTestId}>
      <FormattedMessage id={messageId} />
    </Link>
  </Box>
);

export default BackToLoginLink;
