import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import logoDemo from "assets/logo/swo-logo-demo.svg";
import logo from "assets/logo/swo-logo.svg";
import { HOME } from "urls";

const getLogo = (demo) => (demo ? logoDemo : logo);
const Logo = ({ dataTestId, demo = false, active = false, width = "auto", height = "auto" }) => {
  /* MPT_TODO: Add 'swo-logo' translation */
  // const intl = useIntl();

<<<<<<< HEAD
  const renderLogo = <img width={width} height={height} src={getLogo(demo)} alt={"swo-logo"} data-test-id={dataTestId} />;
=======
const getLogo = (demo, white, size) => {
  if (demo) {
    return logosMap[`logo${capitalize(size)}Demo`];
  }
  if (white) {
    return logosMap[`logo${capitalize(size)}White`];
  }
  return logosMap.logo;
};

type LogoProps = {
  dataTestId?: string;
  demo?: boolean;
  active?: boolean;
  white?: boolean;
  width?: string | number;
  height?: string | number;
  size?: string;
};

const Logo = ({
  dataTestId,
  demo = false,
  active = false,
  white = false,
  width = "auto",
  height = "auto",
  size = LOGO_SIZE.FULL
}: LogoProps) => {
  const intl = useIntl();

  const renderLogo = (
    <img
      width={width}
      height={height}
      src={getLogo(demo, white, size)}
      alt={intl.formatMessage({ id: "optscale" })}
      data-test-id={dataTestId}
    />
  );
>>>>>>> upstream/integration

  return active ? (
    <Link component={RouterLink} sx={{ display: "flex" }} to={HOME}>
      {renderLogo}
    </Link>
  ) : (
    renderLogo
  );
};

export default Logo;
