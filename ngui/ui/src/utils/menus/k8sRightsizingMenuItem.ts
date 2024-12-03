// import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import k8sRightsizing from "utils/routes/k8sRightsizingRoute";
import BaseMenuItem from "./baseMenuItem";

class K8sRightsizingMenuItem extends BaseMenuItem {
  route = k8sRightsizing;

  messageId = "k8sRightsizingTitle";

  dataTestId = "btn_k8s_rightsizing";

  // MTP_TODO: disabled to match MPT figma designs
  // icon = ViewInArOutlinedIcon;
}

export default new K8sRightsizingMenuItem();
