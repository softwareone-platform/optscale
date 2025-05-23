// import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import { PRODUCT_TOUR_IDS } from "components/Tour";
import { ENVIRONMENT_CREATE } from "urls";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import environments from "utils/routes/environmentsRoute";
import BaseMenuItem from "./baseMenuItem";

class EnvironmentsMenuItem extends BaseMenuItem {
  route = environments;

  messageId = "environments";

  dataTestId = "btn_environments";

  dataProductTourId = PRODUCT_TOUR_IDS.ENVIRONMENTS;

  // MPT_TODO: disabled to match MPT figma designs
  // icon = ScreenShareOutlinedIcon;

  capability = OPTSCALE_CAPABILITY.FINOPS;

  isActive = (currentPath) => currentPath.startsWith(this.route.link) || currentPath.startsWith(ENVIRONMENT_CREATE);
}

export default new EnvironmentsMenuItem();
