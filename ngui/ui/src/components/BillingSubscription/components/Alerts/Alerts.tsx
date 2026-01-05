import { BillingSubscriptionStatus } from "graphql/__generated__/hooks/restapi";
import { BILLING_SUBSCRIPTION_STATUS } from "../../constants";
import CanceledAlert from "./CanceledAlert";
import LimitExceededAlert from "./LimitExceededAlert";
import SuspendedAlert from "./SuspendedAlert";

type AlertsProps = {
  status: BillingSubscriptionStatus;
  gracePeriodStart: number;
  gracePeriodDays: number;
  endDate: number;
  cancelAtPeriodEnd: boolean;
};

const Alerts = ({ status, gracePeriodStart, gracePeriodDays, endDate, cancelAtPeriodEnd }: AlertsProps) => (
  <>
    {status === BILLING_SUBSCRIPTION_STATUS.LIMIT_EXCEEDED && (
      <LimitExceededAlert gracePeriodStart={gracePeriodStart} gracePeriodDays={gracePeriodDays} />
    )}
    {status === BILLING_SUBSCRIPTION_STATUS.SUSPENDED && <SuspendedAlert />}
    {cancelAtPeriodEnd && <CanceledAlert endDate={endDate} />}
  </>
);

export default Alerts;
