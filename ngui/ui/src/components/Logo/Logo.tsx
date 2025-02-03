import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import logoDemo from "assets/logo/swo-logo-demo.svg";
import logo from "assets/logo/swo-logo.svg";
import { HOME } from "urls";

const getLogo = (demo) => (demo ? logoDemo : logo);
const Logo = ({ dataTestId, demo = false, active = false, width = "auto", height = "auto" }) => {
  /* MPT_TODO: Add 'swo-logo' translation */
  // const intl = useIntl();

  const renderLogo = <img width={width} height={height} src={getLogo(demo)} alt={"swo-logo"} data-test-id={dataTestId} />;

  return active ? (
    <Link component={RouterLink} sx={{ display: "flex" }} to={HOME}>
      {renderLogo}
    </Link>
  ) : (
    renderLogo
  );
};

export default Logo;
