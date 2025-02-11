// import TagIcon from "@mui/icons-material/Tag";
import taggingPolicies from "utils/routes/taggingPoliciesRoute";
import BaseMenuItem from "./baseMenuItem";

class TaggingPoliciesMenuItem extends BaseMenuItem {
  route = taggingPolicies;

  messageId = "tagging";

  dataTestId = "btn_tagging_policies";

  // MPT_TODO: disabled to match MPT figma designs
  // icon = TagIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new TaggingPoliciesMenuItem();
