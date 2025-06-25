import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import QuestionMark from "components/QuestionMark";
import DividerHorizontal from "../../../shared/components/DividerHorizontal/DividerHorizontal";
import LabelColon from "../../../shared/components/LabelColon/LabelColon";
import ResponsiveStack from "../../../shared/components/ResponsiveStack/ResponsiveStack";
import { MPT_SPACING_3 } from "../../../utils/layouts";
import ButtonGroup from "../../ButtonGroup";
import { EXPENSES_SPLIT_PERIODS, LINEAR_SELECTOR_ITEMS_TYPES, PDF_ELEMENTS } from "utils/constants";
import { SPACING_1 } from "utils/layouts";
import { getSearchParams, updateSearchParams } from "utils/network";
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

// todo: unify with resources selector
const BreakdownLinearSelector = ({ value, items, onChange }) => {
  const initQueryBreakdownParameter = getSearchParams()[PERIOD_TYPE_QUERY_PARAMETER_NAME] || null;
  const [position, setPosition] = useState(() => {
    const initialIndex = items.findIndex((item) => item.id === initQueryBreakdownParameter);
    return initialIndex >= 0 ? initialIndex : 0;
  });

  useEffect(() => {
    updateSearchParams({ [PERIOD_TYPE_QUERY_PARAMETER_NAME]: value.name });
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
  const { [PERIOD_TYPE_QUERY_PARAMETER_NAME]: periodTypeQueryParameter } = getSearchParams();

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
    updateSearchParams({
      [PERIOD_TYPE_QUERY_PARAMETER_NAME]: periodType.value
    });
    dispatch(changePeriodType(periodType.value));
  }, [dispatch, periodType]);

  const handleClick = ({ name }) => {
    setPeriodType({ name, value: name });
  };

  return (
    <>
      <ResponsiveStack>
        <LabelColon messageId={"timeInterval"} />
        <Stack direction={"row"} alignItems={"center"}>
          <BreakdownLinearSelector value={periodType} items={breakdownLinearSelectorItems} onChange={handleClick} />
          <QuestionMark
            messageId="expensesBreakdownBarChartDescription"
            messageValues={{ periodType: intl.formatMessage({ id: periodType.value }) }}
          />
        </Stack>

        {customContent && (
          <>
            <DividerHorizontal />
            {customContent}
          </>
        )}
      </ResponsiveStack>
      <Box marginTop={MPT_SPACING_3}>{render(periodType.value)}</Box>
      {/* MPT_TODO: disabled to math BDR requirement */}
      {/*<DynamicTextPdf*/}
      {/*  pdfId={PDF_ELEMENTS.costExplorer.periodWidgetTitle}*/}
      {/*  renderData={() => ({*/}
      {/*    text: {*/}
      {/*      [EXPENSES_SPLIT_PERIODS.DAILY]: "dailyExpenses",*/}
      {/*      [EXPENSES_SPLIT_PERIODS.WEEKLY]: "weeklyExpenses",*/}
      {/*      [EXPENSES_SPLIT_PERIODS.MONTHLY]: "monthlyExpenses"*/}
      {/*    }[periodType.value],*/}
      {/*    elementType: PDF_ELEMENTS.basics.H2*/}
      {/*  })}*/}
      {/*/>*/}
      {/*{render(periodType.value)}*/}
    </>
  );
};

export default ExpensesBreakdownByPeriodWidget;
