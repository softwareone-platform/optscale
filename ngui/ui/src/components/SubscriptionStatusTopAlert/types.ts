import { ReactNode } from "react";

export type LimitExceededAlertProps = {
  gracePeriodStart: number;
  gracePeriodDays: number;
};

export type SettingsLinkProps = {
  children: ReactNode;
};

export type StatusAlertProps = {
  children: ReactNode;
  color: "error" | "warning" | "info" | "success";
};
