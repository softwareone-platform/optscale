// import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import powerSchedulesRoute from "utils/routes/powerSchedulesRoute";
import BaseMenuItem from "./baseMenuItem";

class PowerSchedulesMenuItem extends BaseMenuItem {
  route = powerSchedulesRoute;

  messageId = "powerSchedulesTitle";

  dataTestId = "btn_power_schedules";

  // TODO: remove after TDR approval
  // icon = ScheduleOutlinedIcon;

  isActive = (currentPath) => currentPath.startsWith(this.route.link);
}

export default new PowerSchedulesMenuItem();
