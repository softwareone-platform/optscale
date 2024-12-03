// import FinOpsChecklistIcon from "icons/FinOpsChecklistIcon";
import finOpsPortal from "utils/routes/finOpsPortalRoute";
import BaseMenuItem from "./baseMenuItem";

class FinOpsPortalMenuItem extends BaseMenuItem {
  route = finOpsPortal;

  messageId = "finOpsPortalTitle";

  dataTestId = "btn_finops_portal";

  // MTP_TODO: disabled to match MPT figma designs
  // icon = FinOpsChecklistIcon;
}

export default new FinOpsPortalMenuItem();
