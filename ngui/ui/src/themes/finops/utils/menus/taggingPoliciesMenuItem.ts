import TagIcon from "@mui/icons-material/Tag";
import BaseMenuItem from "@main/utils/menus/baseMenuItem";
import taggingPolicies from "utils/routes/taggingPoliciesRoute";

class TaggingPoliciesMenuItem extends BaseMenuItem {
  route = taggingPolicies;

  messageId = "taggingPolicies";

  dataTestId = "btn_tagging_policies";

  icon = TagIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new TaggingPoliciesMenuItem();
