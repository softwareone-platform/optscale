import SummaryGrid from "components/SummaryGrid";
import { useIsOptScaleCapabilityEnabled } from "hooks/useIsOptScaleCapabilityEnabled";
import { OPTSCALE_CAPABILITY, SUMMARY_VALUE_COMPONENT_TYPES } from "utils/constants";

type SummaryCardsProps = {
  runsCount: number;
  completedRuns: number;
  cost: number;
  isLoading?: boolean;
};

const SummaryCards = ({ runsCount, completedRuns, cost, isLoading = false }: SummaryCardsProps) => {
  const isFinOpsEnabled = useIsOptScaleCapabilityEnabled(OPTSCALE_CAPABILITY.FINOPS);

  return (
    <SummaryGrid
      summaryData={[
        {
          key: "configurations_tried",
          valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.Custom,
          CustomValueComponent: () => runsCount,
          color: "primary",
          captionMessageId: "configurationsTried",
          dataTestIds: {
            cardTestId: "card_configurations_tries"
          },
          isLoading
        },
        {
          key: "completed_runs",
          valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.Custom,
          CustomValueComponent: () => completedRuns,
          color: "primary",
          captionMessageId: "completedRuns",
          dataTestIds: {
            cardTestId: "card_completed_runs"
          },
          isLoading
        },
        ...(isFinOpsEnabled
          ? [
              {
                key: "totalExpenses",
                valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
                valueComponentProps: {
                  value: cost
                },
                color: "primary",
                captionMessageId: "totalExpenses",
                dataTestIds: {
                  cardTestId: "card_total_expenses"
                },
                isLoading
              }
            ]
          : [])
      ]}
    />
  );
};

export default SummaryCards;
