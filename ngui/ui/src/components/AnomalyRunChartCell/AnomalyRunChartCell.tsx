import { FormattedNumber } from "react-intl";
import FormattedMoney from "components/FormattedMoney";
import HeartLineChart from "components/HeartLineChart";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { EXPENSE_ANOMALY } from "utils/constants";
import { CELL_EMPTY_VALUE } from "utils/tables";

const AnomalyRunChartCell = ({ breakdown, today, average, threshold, type, todayMessageId = "today" }) => {
  const onlyValues = Object.values(breakdown);
  onlyValues.push(today);

  const getFormattedValue = (value) =>
    type === EXPENSE_ANOMALY ? <FormattedMoney value={value} /> : <FormattedNumber value={value} maximumFractionDigits={0} />;

  return onlyValues.length < 2 ? (
    CELL_EMPTY_VALUE
  ) : (
    <HeartLineChart
      values={onlyValues}
      width={160}
      height={40}
      tooltip={
        <>
          <KeyValueLabel keyMessageId="average" value={getFormattedValue(average)} />
          <KeyValueLabel keyMessageId={todayMessageId} value={getFormattedValue(today)} />
        </>
      }
      thresholdArea={{
        start: average,
        end: average * (1 + threshold / 100)
      }}
    />
  );
};

export default AnomalyRunChartCell;
