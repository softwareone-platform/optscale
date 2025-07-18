import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ActionBar from "components/ActionBar";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import Mocked from "components/Mocked";
import PageContentWrapper from "components/PageContentWrapper";
import { RegionExpensesMocked } from "components/RegionExpenses";
import TabsWrapper from "components/TabsWrapper";
import { TrafficExpensesMocked } from "components/TrafficExpenses";
import TrafficExpensesContainer from "components/TrafficExpensesContainer";
import RangePickerFormContainer from "containers/RangePickerFormContainer";
import RegionExpensesContainer from "containers/RegionExpensesContainer";
import { useReactiveDefaultDateRange } from "hooks/useReactiveDefaultDateRange";
import { DATE_RANGE_TYPE, EXPENSES_MAP_TYPES } from "utils/constants";
import { SPACING_2 } from "utils/layouts";
import { updateSearchParams } from "utils/network";
import LabelColon from "../../shared/components/LabelColon/LabelColon";
import ResponsiveStack from "../../shared/components/ResponsiveStack/ResponsiveStack";

const actionBarDefinition = {
  title: {
    messageId: "costMapTitle"
  }
};

const ExpensesMap = () => {
  const theme = useTheme();
  const tabs = [
    {
      title: EXPENSES_MAP_TYPES.REGION,
      dataTestId: `tab_${EXPENSES_MAP_TYPES.REGION}`,
      node: (
        <Mocked mock={<RegionExpensesMocked />}>
          <RegionExpensesContainer />
        </Mocked>
      )
    },
    {
      title: EXPENSES_MAP_TYPES.TRAFFIC,
      dataTestId: `tab_${EXPENSES_MAP_TYPES.TRAFFIC}`,
      node: (
        <Mocked mock={<TrafficExpensesMocked />}>
          <TrafficExpensesContainer />
        </Mocked>
      )
    }
  ];

  // dates query handlers
  const [startDateTimestamp, endDateTimestamp] = useReactiveDefaultDateRange(DATE_RANGE_TYPE.EXPENSES);

  const applyDates = ({ startDate, endDate }) => {
    updateSearchParams({
      startDate,
      endDate
    });
  };

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Box className={"MTPBoxShadow"}>
          <TabsWrapper
            tabsProps={{
              name: "expensesMapsTab",
              queryTabName: "type",
              tabs,
              defaultTab: EXPENSES_MAP_TYPES.REGION
            }}
            headerSx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                sm: "row",
                xs: "column"
              }
            }}
            headerAdornment={
              <Box display="flex" alignItems="center" sx={{ py: { xs: theme.spacing(SPACING_2), sm: 0 } }}>
                <ResponsiveStack>
                  <LabelColon messageId={"dateRange"} />
                  <RangePickerFormContainer
                    onApply={applyDates}
                    initialStartDateValue={startDateTimestamp}
                    initialEndDateValue={endDateTimestamp}
                    rangeType={DATE_RANGE_TYPE.EXPENSES}
                    definedRanges={getBasicRangesSet()}
                  />
                </ResponsiveStack>
              </Box>
            }
          />
        </Box>
      </PageContentWrapper>
    </>
  );
};

export default ExpensesMap;
