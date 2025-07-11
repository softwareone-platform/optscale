import type { ObjectValues } from "utils/types";
import { ALERT_TYPES } from "./constants";

export type StoredAlert = {
  id: number;
  closed?: boolean;
  triggered?: boolean;
};

export type AlertType = ObjectValues<typeof ALERT_TYPES>;

export type TopAlertWrapperProps = {
  blacklistIds?: AlertType[];
};
