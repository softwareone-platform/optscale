// import EventOutlined from "@mui/icons-material/EventOutlined";
import events from "utils/routes/eventsRoute";
import BaseMenuItem from "./baseMenuItem";

class EventsMenuItem extends BaseMenuItem {
  route = events;

  messageId = "events";

  dataTestId = "btn_events";

  // MTP_TODO: disabled to match MPT figma designs
  // icon = EventOutlined;
}

export default new EventsMenuItem();
