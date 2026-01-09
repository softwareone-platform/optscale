import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import logoDemo from "@theme/assets/logo/swo-logo-demo.svg";
import logo from "@theme/assets/logo/swo-logo.svg";
import { HOME } from "urls";

interface LogoProps {
  dataTestId: string;
  demo?: boolean;
  active?: boolean;
  width?: string | number;
  height?: string | number;
}

const getLogo = (demo: boolean) => (demo ? logoDemo : logo);
const Logo = ({ dataTestId, demo = false, active = false, width = "auto", height = "auto" }: LogoProps) => {
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
