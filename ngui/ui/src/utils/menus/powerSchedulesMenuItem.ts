// import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import powerSchedulesRoute from "utils/routes/powerSchedulesRoute";
import BaseMenuItem from "./baseMenuItem";

class PowerSchedulesMenuItem extends BaseMenuItem {
  route = powerSchedulesRoute;

  messageId = "powerSchedulesTitle";

  dataTestId = "btn_power_schedules";

  // MPT_TODO: disabled to match MPT figma designs
  // icon = ScheduleOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new PowerSchedulesMenuItem();
