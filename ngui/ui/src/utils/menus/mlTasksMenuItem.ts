// import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { ML_RUN_BASE } from "urls";
import mlTasksRoute from "utils/routes/mlTasksRoute";
import BaseMenuItem from "./baseMenuItem";

class MlTasksMenuItem extends BaseMenuItem {
  route = mlTasksRoute;

  messageId = "tasks";

  dataTestId = "btn_ml_tasks";

  // MPT_TODO: disabled to match MPT figma designs
  // icon = TaskAltOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link) || currentPath.startsWith(`/${ML_RUN_BASE}/`);
}

export default new MlTasksMenuItem();
