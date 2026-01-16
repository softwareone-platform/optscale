import { FormattedMessage } from "react-intl";
import FeaturesList from "../../FeaturesList";
import ExpensesLimit from "./ExpensesLimit";

export type FreeFeaturesProps = {
  monthExpenses: Record<string, number>;
  monthlyExpensesLimit: number;
};

const features = ["billingSubscriptionFeatures.8HourSupportFiveDaysAWeek"] as const;

const FreeFeatures = ({ monthExpenses, monthlyExpensesLimit }: FreeFeaturesProps) => (
  <FeaturesList>
    <li>
      <ExpensesLimit monthExpenses={monthExpenses} monthlyExpensesLimit={monthlyExpensesLimit} />
    </li>
    {features.map((feature) => (
      <li key={feature}>
        <FormattedMessage id={feature} />
      </li>
    ))}
  </FeaturesList>
);

export default FreeFeatures;
