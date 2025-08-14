import { useMemo } from "react";
import { useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Filters from "components/Filters";
import { ML_TASK_RUNS_FILTERS } from "components/Filters/constants";
import LinearSelector from "components/LinearSelector";
import TypographyLoader from "components/TypographyLoader";
import { GOALS_BE_FILTER, GOAL_STATUS, STATUS_BE_FILTER } from "utils/constants";
import { SPACING_3 } from "utils/layouts";
import { removeKey } from "utils/objects";

const RunsFilters = ({ datePicker, runs, appliedFilters, onChange, isLoading }) => {
  const theme = useTheme();

  const filterValues = useMemo(() => {
    const statuses = [...new Set(runs.map(({ status }) => status))];

    return {
      [STATUS_BE_FILTER]: statuses.map((status) => ({
        name: status
      })),
      [GOALS_BE_FILTER]: [
        {
          name: GOAL_STATUS.MET,
          value: true
        },
        {
          name: GOAL_STATUS.NOT_MET,
          value: false
        }
      ]
    };
  }, [runs]);

  const filters = useMemo(
    () =>
      new Filters({
        filters: ML_TASK_RUNS_FILTERS,
        filterValues,
        appliedFilters
      }),
    [filterValues, appliedFilters]
  );

  const onFilterDelete = ({ filterName }) => {
    const newAppliedFilters = removeKey(appliedFilters, filterName);
    onChange(newAppliedFilters);
  };

  const onFilterChange = ({ name, value }) => {
    const newAppliedFilters = { ...appliedFilters, [name]: value };
    onChange(newAppliedFilters);
  };

  const onFiltersClear = () => {
    const { startDate, endDate } = appliedFilters;
    const newAppliedFilters = { startDate, endDate };
    onChange(newAppliedFilters);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <div>{datePicker}</div>
      <div style={{ width: theme.spacing(SPACING_3) }} />
      {isLoading ? (
        <span style={{ width: "250px" }}>
          <TypographyLoader linesCount={1} />
        </span>
      ) : (
        <LinearSelector
          label={<FormattedMessage id="filters" />}
          value={filters.getAppliedValues()}
          items={filters.getFilterSelectors()}
          onClear={onFilterDelete}
          onChange={onFilterChange}
          onClearAll={onFiltersClear}
        />
      )}
    </div>
  );
};

export default RunsFilters;
