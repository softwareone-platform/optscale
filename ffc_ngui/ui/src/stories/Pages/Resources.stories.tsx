import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { GET_RESOURCE_COUNT_BREAKDOWN } from "api/restapi/actionTypes";
import Resources from "components/Resources";
import { data } from "components/Resources/ResourcesMocked";
import { millisecondsToSeconds, addDays } from "utils/datetime";
import { FILTER_CONFIGS } from "components/Resources/filterConfigs";
import { CLEAN_EXPENSES_BREAKDOWN_TYPES } from "utils/constants";

export default {
  component: Resources
};

const firstDateRangePoint = millisecondsToSeconds(+new Date());
const lastDateRangePoint = millisecondsToSeconds(+new Date());

const mockStore = configureMockStore();
const store = mockStore({
  api: {
    [GET_RESOURCE_COUNT_BREAKDOWN]: {
      isLoading: false,
      timestamp: addDays(Date.now(), 30)
    }
  },
  restapi: {
    [GET_RESOURCE_COUNT_BREAKDOWN]: {
      breakdown: {
        1633046400: {
          Instance: 3,
          Volume: 5
        },
        1633132800: {
          Instance: 3,
          Volume: 6,
          Snapshot: 2,
          "SomeCluster/cluster": 1
        }
      }
    }
  }
});

export const basic = () => (
  <Provider store={store}>
    <Resources
      startDateTimestamp={firstDateRangePoint}
      endDateTimestamp={lastDateRangePoint}
      filterValues={data.filterValues}
      onApply={() => console.log("onApply")}
      requestParams={data.requestParams}
      activeBreakdown={CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES}
      selectedPerspectiveName={undefined}
      perspectives={{}}
      onPerspectiveApply={() => console.log("onPerspectiveApply")}
      appliedFilters={Object.fromEntries(
        Object.values(FILTER_CONFIGS).map((filterConfig) => {
          const { id, getDefaultValue } = filterConfig;
          return [id, getDefaultValue()];
        })
      )}
      onAppliedFiltersChange={() => console.log("onAppliedFiltersChange")}
      isFilterValuesLoading={false}
      onBreakdownChange={() => console.log("onBreakdownChange")}
    />
  </Provider>
);

export const isLoading = () => (
  <Resources
    isFilterValuesLoading
    startDateTimestamp={firstDateRangePoint}
    endDateTimestamp={lastDateRangePoint}
    filterValues={data.filterValues}
    onApply={() => console.log("onApply")}
    requestParams={data.requestParams}
    activeBreakdown={CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES}
    selectedPerspectiveName={undefined}
    perspectives={{}}
    onPerspectiveApply={() => console.log("onPerspectiveApply")}
    appliedFilters={Object.fromEntries(
      Object.values(FILTER_CONFIGS).map((filterConfig) => {
        const { id, getDefaultValue } = filterConfig;
        return [id, getDefaultValue()];
      })
    )}
    onAppliedFiltersChange={() => console.log("onAppliedFiltersChange")}
    onBreakdownChange={() => console.log("onBreakdownChange")}
  />
);
