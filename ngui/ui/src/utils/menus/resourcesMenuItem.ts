// import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import { PRODUCT_TOUR_IDS } from "components/Tour";
import { CLUSTER_TYPE_CREATE } from "urls";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import clusterTypesRoute from "utils/routes/clusterTypesRoute";
import resources from "utils/routes/resourcesRoute";
import BaseMenuItem from "./baseMenuItem";

class ResourcesMenuItem extends BaseMenuItem {
  route = resources;

  messageId = "resources";

  dataTestId = "btn_resources";

  dataProductTourId = PRODUCT_TOUR_IDS.RESOURCES;

  // MPT_TODO: disabled to match MPT figma designs
  // icon = StorageOutlinedIcon;

  capability = OPTSCALE_CAPABILITY.FINOPS;

  isActive = (currentPath) =>
    currentPath.startsWith(this.route.link) ||
    currentPath.startsWith(clusterTypesRoute.link) ||
    currentPath.startsWith(CLUSTER_TYPE_CREATE);
}

export default new ResourcesMenuItem();
