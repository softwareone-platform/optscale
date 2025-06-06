// import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import resourceLifecycle from "utils/routes/resourceLifecycleRoute";
import BaseMenuItem from "./baseMenuItem";

class ResourceLifecycleMenuItem extends BaseMenuItem {
  route = resourceLifecycle;

  messageId = "resourceLifecycleTitle";

  dataTestId = "btn_resource_lifecycle";

  // MPT_TODO: disabled to match MPT figma designs
  // icon = CloudSyncOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new ResourceLifecycleMenuItem();
