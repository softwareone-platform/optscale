import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN } from "urls";

const AlreadyHaveAnAccountSignInMessage = () => (
  <Typography>
    <Link color="primary" to={LOGIN} component={RouterLink}>
      <FormattedMessage id="haveAccountSignIn" />
    </Link>
  </Typography>
);

export default AlreadyHaveAnAccountSignInMessage;
