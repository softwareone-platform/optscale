import FormattedDuration from "components/FormattedDuration";
import MlRunStatus from "components/MlRunStatus";
import SummaryGrid from "components/SummaryGrid";
import { ML_RUN_STATUS, SUMMARY_VALUE_COMPONENT_TYPES } from "utils/constants";

const StatusSummaryGrid = ({ cost, status, duration, withCost = false, isLoading = false }) => (
  <SummaryGrid
    summaryData={[
      {
        key: "status",
        valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.Custom,
        CustomValueComponent: MlRunStatus,
        valueComponentProps: { status, iconSize: "medium" },
        color: {
          [ML_RUN_STATUS.RUNNING]: "primary",
          [ML_RUN_STATUS.ABORTED]: "info",
          [ML_RUN_STATUS.COMPLETED]: "success",
          [ML_RUN_STATUS.FAILED]: "error"
        }[status],
        captionMessageId: "status",
        renderCondition: () => status !== undefined,
        isLoading,
        dataTestIds: {
          cardTestId: "card_run_status"
        }
      },
      {
        key: "duration",
        valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.Custom,
        CustomValueComponent: FormattedDuration,
        valueComponentProps: {
          durationInSeconds: duration
        },
        renderCondition: () => status !== ML_RUN_STATUS.FAILED,
        captionMessageId: "duration",
        isLoading,
        dataTestIds: {
          cardTestId: "card_run_duration"
        }
      },
      {
        key: "cost",
        valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
        valueComponentProps: {
          value: cost
        },
        captionMessageId: "expenses",
        dataTestIds: {
          cardTestId: "card_expenses"
        },
        isLoading,
        renderCondition: () => withCost
      }
    ]}
  />
);

export default StatusSummaryGrid;
