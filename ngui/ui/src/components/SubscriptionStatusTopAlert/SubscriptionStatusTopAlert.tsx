import { BILLING_SUBSCRIPTION_STATUS } from "components/BillingSubscription/constants";
import { useBillingSubscription } from "hooks/coreData/useBillingSubscription";
import { LimitExceededAlert, SuspendedAlert } from "./components";

const SubscriptionStatusTopAlert = () => {
  const billingSubscription = useBillingSubscription();

  switch (billingSubscription?.status) {
    case BILLING_SUBSCRIPTION_STATUS.SUSPENDED:
      return <SuspendedAlert />;
    case BILLING_SUBSCRIPTION_STATUS.LIMIT_EXCEEDED:
      return (
        <LimitExceededAlert
          gracePeriodStart={billingSubscription.grace_period_start}
          gracePeriodDays={billingSubscription.plan.grace_period_days}
        />
      );
    default:
      return null;
  }
};

export default SubscriptionStatusTopAlert;
