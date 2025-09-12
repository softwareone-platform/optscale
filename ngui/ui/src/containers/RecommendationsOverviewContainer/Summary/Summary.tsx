import { type NavigateFunction, useNavigate } from "react-router-dom";
import { SI_UNITS } from "components/FormattedDigitalUnit";
import { STATUS } from "components/S3DuplicateFinderCheck/utils";
import SummaryGrid from "components/SummaryGrid";
import { useAwsDataSources } from "hooks/useAwsDataSources";
import S3DuplicatesService from "services/S3DuplicatesService";
import { S3_DUPLICATE_FINDER, getRiSpCoverageUrl } from "urls";
import { isEmptyArray } from "utils/arrays";
import { SUMMARY_CARD_TYPES, SUMMARY_VALUE_COMPONENT_TYPES } from "utils/constants";
import { getCurrentUTCTimeInSec, getLast30DaysRange, getTimeDistance } from "utils/datetime";
import { getSearchParams } from "utils/network";

type RiSpExpensesSummaryType = {
  totalCostWithOffer: number;
  totalSaving: number;
  computeExpensesCoveredWithCommitments: number;
};

type SummaryProps = {
  totalSaving: number;
  lastCompleted: number;
  lastRun: number;
  nextRun: number;
  riSpExpensesSummary: RiSpExpensesSummaryType;
  isLoadingProps: {
    isRecommendationsLoading: boolean;
    isRiSpExpensesSummaryLoading: boolean;
  };
};

const getNextCheckCardValue = (lastRun: number, lastCompleted: number, nextRun: number) => {
  if (lastRun !== lastCompleted) {
    return {
      id: "runningRightNow"
    };
  }

  if (!nextRun) {
    return { id: "never" };
  }

  if (nextRun <= getCurrentUTCTimeInSec()) {
    return { id: "aboutToStart" };
  }

  return {
    id: "valueIn",
    values: {
      value: getTimeDistance(nextRun)
    }
  };
};

const getRiSpExpensesCardDefinition = ({
  riSpExpensesSummary,
  isLoading,
  navigate
}: {
  riSpExpensesSummary: RiSpExpensesSummaryType;
  isLoading: boolean;
  navigate: NavigateFunction;
}) => {
  const { totalCostWithOffer, totalSaving, computeExpensesCoveredWithCommitments } = riSpExpensesSummary;

  const getColor = () => {
    if (computeExpensesCoveredWithCommitments < 0.05) {
      return "error";
    }
    if (computeExpensesCoveredWithCommitments < 0.5) {
      return "warning";
    }

    return "success";
  };

  return {
    key: "riSpExpenses",
    type: SUMMARY_CARD_TYPES.EXTENDED,
    valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
    valueComponentProps: {
      value: totalSaving
    },
    color: getColor(),
    captionMessageId: "savedWithCommitmentsForTheLast30Days",
    dataTestIds: {
      cardTestId: "card_ri_sp_expenses",
      titleTestId: "p_ri_sp_expenses",
      valueTestId: "p_ri_sp_expenses"
    },
    relativeValueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedNumber,

    relativeValueComponentProps: {
      format: "percentage",
      value: computeExpensesCoveredWithCommitments
    },
    button: {
      show: true,
      onClick: () => {
        const { startDate, endDate } = getLast30DaysRange();
        const { dataSourceId } = getSearchParams();

        const url = getRiSpCoverageUrl({
          secondsStartDate: startDate,
          secondsEndDate: endDate,
          dataSourceId
        });

        navigate(url);
      },
      tooltip: {
        show: true,
        messageId: "seeRiSpCoverage",
        placement: "top"
      }
    },
    relativeValueCaptionMessageId: "computeExpensesCoveredWithCommitments",
    isLoading,
    renderCondition: () => totalCostWithOffer && totalCostWithOffer !== 0
  };
};

const useS3DuplicateFinderCheckCardDefinition = () => {
  const { useGetAll: useGetAllGeminis } = S3DuplicatesService();

  const { isLoading, geminis } = useGetAllGeminis();

  const awsDataSources = useAwsDataSources();

  const navigate = useNavigate();

  const button = {
    show: true,
    onClick: () => {
      navigate(S3_DUPLICATE_FINDER);
    },
    tooltip: {
      show: true,
      messageId: "goToS3DuplicateFinder",
      placement: "top"
    }
  };

  const defaultCardDefinition = {
    key: "duplicationChecks",
    button,
    isLoading,
    dataTestIds: {
      cardTestId: "card_s3_duplicates",
      titleTestId: "p_s3_duplicates",
      valueTestId: "p_s3_duplicates_value"
    }
  };

  if (isEmptyArray(awsDataSources)) {
    return {
      ...defaultCardDefinition,
      valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMessage,
      valueComponentProps: {
        id: "s3DuplicatesUnknown"
      },
      captionMessageId: "noConnectedAWSDataSources"
    };
  }

  const successfulGeminis = geminis.filter(({ status }) => status === STATUS.SUCCESS);

  if (isEmptyArray(successfulGeminis)) {
    return {
      ...defaultCardDefinition,
      button,
      valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMessage,
      valueComponentProps: {
        id: "s3DuplicatesUnknown"
      },
      captionMessageId: "noSuccessfullyCompletedChecks"
    };
  }

  const lastSuccessfulGemini = [...successfulGeminis].sort(
    ({ last_completed: lastCompletedA }, { last_completed: lastCompleteB }) => lastCompleteB - lastCompletedA
  )[0];

  const { stats: { monthly_savings: monthlySavings = 0, duplicates_size: duplicatesSize = 0 } = {} } = lastSuccessfulGemini;

  return {
    ...defaultCardDefinition,
    type: SUMMARY_CARD_TYPES.EXTENDED,
    valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedDigitalUnit,
    valueComponentProps: {
      value: duplicatesSize,
      baseUnit: SI_UNITS.BYTE
    },
    captionMessageId: "s3DuplicatesRecommendationsCardCaption",
    relativeValueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
    relativeValueComponentProps: {
      value: monthlySavings
    },
    relativeValueCaptionMessageId: "possibleMonthlySavings"
  };
};

const Summary = ({ totalSaving, lastCompleted, lastRun, nextRun, riSpExpensesSummary, isLoadingProps }: SummaryProps) => {
  const navigate = useNavigate();

  const { isRecommendationsLoading, isRiSpExpensesSummaryLoading } = isLoadingProps;

  const s3DuplicateFinderCheckCardDefinition = useS3DuplicateFinderCheckCardDefinition();

  const summaryData = [
    {
      key: "possibleMonthlySavings",
      valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMoney,
      valueComponentProps: {
        value: totalSaving
      },
      dataTestIds: {
        cardTestId: "card_saving",
        titleTestId: "p_saving",
        valueTestId: "p_saving_value"
      },
      captionMessageId: "possibleMonthlySavings",
      isLoading: isRecommendationsLoading
    },
    {
      key: "lastCheckTime",
      type: SUMMARY_CARD_TYPES.EXTENDED,
      valueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMessage,
      valueComponentProps: {
        id: !lastCompleted ? "never" : "valueAgo",
        values: {
          value: !lastCompleted ? null : getTimeDistance(lastCompleted)
        }
      },
      captionMessageId: "lastCheckTime",
      dataTestIds: {
        cardTestId: "card_last_check",
        titleTestId: "p_last_check",
        valueTestId: "p_last_time"
      },
      relativeValueComponentType: SUMMARY_VALUE_COMPONENT_TYPES.FormattedMessage,
      relativeValueComponentProps: getNextCheckCardValue(lastRun, lastCompleted, nextRun),
      relativeValueCaptionMessageId: "nextCheckTime",
      isLoading: isRecommendationsLoading
    },
    getRiSpExpensesCardDefinition({ riSpExpensesSummary, isLoading: isRiSpExpensesSummaryLoading, navigate }),
    s3DuplicateFinderCheckCardDefinition
  ];

  return <SummaryGrid summaryData={summaryData} />;
};

export default Summary;
