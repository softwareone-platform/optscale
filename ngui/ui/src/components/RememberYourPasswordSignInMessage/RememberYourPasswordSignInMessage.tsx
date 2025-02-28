import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN, OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME } from "urls";
import { getQueryParams } from "utils/network";
import { buildQueryParameters } from "utils/strings";

const RememberYourPasswordSignInMessage = () => {
  const { [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getQueryParams() as {
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
  };

  const capabilityParameter = capability ? (`${OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME}=${capability}` as const) : "";

  const to = buildQueryParameters(LOGIN, [capabilityParameter]);

  return (
    <Typography>
      <Link color="primary" to={to} component={RouterLink}>
        <FormattedMessage id="rememberYourPasswordSignIn" />
      </Link>
    </Typography>
  );
};

export default RememberYourPasswordSignInMessage;
