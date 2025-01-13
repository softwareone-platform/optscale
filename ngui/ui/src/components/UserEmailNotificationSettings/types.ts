import { ChangeEvent, ReactNode } from "react";

// TODO TS: Replace with apollo types
export type ApiEmployeeEmail = {
  id: string;
  available_by_role: boolean;
  email_template:
    | "weekly_expense_report"
    | "pool_exceed_resources_report"
    | "pool_exceed_report"
    | "alert"
    | "saving_spike"
    | "resource_owner_violation_report"
    | "pool_owner_violation_report"
    | "resource_owner_violation_alert"
    | "anomaly_detection_alert"
    | "organization_policy_expiring_budget"
    | "organization_policy_quota"
    | "organization_policy_recurring_budget"
    | "organization_policy_tagging"
    | "new_security_recommendation"
    | "environment_changes"
    | "report_imports_passed_for_org"
    | "invite";
  enabled: boolean;
  employee_id: string;
};

export type EmployeeEmail = {
  title: string;
  description: string;
} & ApiEmployeeEmail;

export type EmailSettingProps = {
  emailId: string;
  employeeId: string;
  enabled: boolean;
  emailTitle: string;
  description: string;
};

export type LoadingSwitchProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
};

export type UserEmailSettingsProps = {
  title: ReactNode;
  employeeEmails: EmployeeEmail[];
};

export type UserEmailNotificationSettingsProps = {
  employeeEmails: ApiEmployeeEmail[];
  isLoading: boolean;
};
