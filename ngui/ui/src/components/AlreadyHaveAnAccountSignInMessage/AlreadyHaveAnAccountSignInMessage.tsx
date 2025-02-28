import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN, OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME } from "urls";
import { formQueryString, getQueryParams } from "utils/network";

const AlreadyHaveAnAccountSignInMessage = () => {
  const { [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getQueryParams() as {
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
  };

  const to = `${LOGIN}?${formQueryString({
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability
  })}`;

  return (
    <Typography>
      <Link color="primary" to={to} component={RouterLink}>
        <FormattedMessage id="haveAccountSignIn" />
      </Link>
    </Typography>
  );
};

export default AlreadyHaveAnAccountSignInMessage;
