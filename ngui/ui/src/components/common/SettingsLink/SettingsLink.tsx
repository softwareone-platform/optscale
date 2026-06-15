import { ReactNode } from "react";
import { Link } from "@mui/material";
import type { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { getSettingsUrl } from "urls";
import { SETTINGS_TABS } from "utils/constants";
import { ObjectValues } from "utils/types";

export type SettingsLinkProps = {
  children: ReactNode;
  color?: MuiLinkProps["color"];
  underline?: MuiLinkProps["underline"];
  tab?: ObjectValues<typeof SETTINGS_TABS>;
};

const SettingsLink = ({ children, color, underline, tab }: SettingsLinkProps) => (
  <Link color={color} underline={underline} component={RouterLink} to={getSettingsUrl(tab)}>
    {children}
  </Link>
);

export default SettingsLink;
