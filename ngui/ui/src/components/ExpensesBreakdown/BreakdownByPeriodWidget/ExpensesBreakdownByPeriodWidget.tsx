import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import QuestionMark from "components/QuestionMark";
import { EXPENSES_SPLIT_PERIODS, LINEAR_SELECTOR_ITEMS_TYPES } from "utils/constants";
import { MPT_SPACING_1, MPT_SPACING_2, SPACING_1 } from "utils/layouts";
import { getQueryParams, updateQueryParams } from "utils/network";
import ButtonGroup from "../../ButtonGroup";
import { changePeriodType } from "./actionCreator";
import { EXPENSES_BREAKDOWN_PERIOD_TYPE } from "./reducer";

const PERIOD_TYPE_QUERY_PARAMETER_NAME = "expenses";

const breakdownLinearSelectorItems = [
  {
    name: EXPENSES_SPLIT_PERIODS.DAILY,
    value: EXPENSES_SPLIT_PERIODS.DAILY,
    id: EXPENSES_SPLIT_PERIODS.DAILY,
    messageId: EXPENSES_SPLIT_PERIODS.DAILY,
    type: LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
    dataTestId: "breakdown_ls_item_daily"
  },
  {
    name: EXPENSES_SPLIT_PERIODS.WEEKLY,
    value: EXPENSES_SPLIT_PERIODS.WEEKLY,
    id: EXPENSES_SPLIT_PERIODS.WEEKLY,
    messageId: EXPENSES_SPLIT_PERIODS.WEEKLY,
    type: LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
    dataTestId: "breakdown_ls_item_weekly"
  },
  {
    name: EXPENSES_SPLIT_PERIODS.MONTHLY,
    value: EXPENSES_SPLIT_PERIODS.MONTHLY,
    id: EXPENSES_SPLIT_PERIODS.MONTHLY,
    messageId: EXPENSES_SPLIT_PERIODS.MONTHLY,
    type: LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
    dataTestId: "breakdown_ls_item_monthly"
  }
];

const BreakdownLinearSelector = ({ value, items, onChange }) => {
  const initQueryBreakdownParameter = getQueryParams()[PERIOD_TYPE_QUERY_PARAMETER_NAME] || null;
  const [position, setPosition] = useState(() => {
    const initialIndex = items.findIndex((item) => item.id === initQueryBreakdownParameter);
    return initialIndex >= 0 ? initialIndex : 0;
  });

  useEffect(() => {
    updateQueryParams({ [PERIOD_TYPE_QUERY_PARAMETER_NAME]: value.name });
  }, [value.name]);

  const handleButtonClick = (newValue) => {
    onChange(newValue);
    setPosition(newValue.index);
  };

  return <ButtonGroup onButtonClick={handleButtonClick} buttons={items} activeButtonIndex={position} />;
};

const ExpensesBreakdownByPeriodWidget = ({ render, customContent = null }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { [PERIOD_TYPE_QUERY_PARAMETER_NAME]: periodTypeQueryParameter } = getQueryParams();

  const periodTypeState = useSelector((state) => state[EXPENSES_BREAKDOWN_PERIOD_TYPE]);

  const [periodType, setPeriodType] = useState(() => {
    const breakdown =
      breakdownLinearSelectorItems.find(({ name }) => name === periodTypeQueryParameter) ||
      breakdownLinearSelectorItems.find(({ name }) => name === periodTypeState);

    if (breakdown) {
      return breakdown;
    }

    return breakdownLinearSelectorItems[0];
  });

  useEffect(() => {
    updateQueryParams({
      [PERIOD_TYPE_QUERY_PARAMETER_NAME]: periodType.value
    });
    dispatch(changePeriodType(periodType.value));
  }, [dispatch, periodType]);

  const handleClick = ({ name }) => {
    setPeriodType({ name, value: name });
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={SPACING_1}>
        <Typography variant={"fontWeightBold"} component="div" sx={{ marginRight: MPT_SPACING_2 }}>
          <FormattedMessage id={"breakdownBy"} />
          {": "}
        </Typography>
        <BreakdownLinearSelector value={periodType} items={breakdownLinearSelectorItems} onChange={handleClick} />
        <QuestionMark
          messageId="expensesBreakdownBarChartDescription"
          messageValues={{ periodType: intl.formatMessage({ id: periodType.value }) }}
        />
        {customContent && (
          <>
            <Divider
              style={{ margin: MPT_SPACING_1, marginLeft: MPT_SPACING_2, marginRight: MPT_SPACING_2 }}
              flexItem
              orientation="vertical"
            />
            <Box>{customContent}</Box>
          </>
        )}
      </Box>
      <Divider style={{ marginTop: MPT_SPACING_2, marginBottom: MPT_SPACING_2 }} />
      {/* MPT_TODO: disabled to math BDR requirement */}
      {/* <DynamicTextPdf */}
      {/*  pdfId={PDF_ELEMENTS.costExplorer.periodWidgetTitle} */}
      {/*  renderData={() => ({ */}
      {/*    text: { */}
      {/*      [EXPENSES_SPLIT_PERIODS.DAILY]: "dailyExpenses", */}
      {/*      [EXPENSES_SPLIT_PERIODS.WEEKLY]: "weeklyExpenses", */}
      {/*      [EXPENSES_SPLIT_PERIODS.MONTHLY]: "monthlyExpenses" */}
      {/*    }[periodType.value], */}
      {/*    elementType: PDF_ELEMENTS.basics.H2 */}
      {/*  })} */}
      {/* /> */}
      {render(periodType.value)}
    </>
  );
};

export default ExpensesBreakdownByPeriodWidget;
