import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

/** The product's name under the logo; a theme overrides this file to give its own. */
const SignInCardTitle = () => (
  <Typography variant="h5" component="h1" fontWeight="medium">
    <FormattedMessage id="optscale" />
  </Typography>
);

export default SignInCardTitle;
