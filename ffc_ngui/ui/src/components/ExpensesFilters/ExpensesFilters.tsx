import { FormattedMessage } from "react-intl";
import LinearSelector from "components/LinearSelector";
import { getPoolIdWithSubPools } from "urls";
import { isEmpty } from "utils/arrays";
import { POOL_ID_FILTER } from "utils/constants";

const ExpensesFilters = ({ items, appliedValues, onFilterAdd, onFilterDelete, onFiltersDelete }) =>
  !isEmpty(items) && (
    <LinearSelector
      label={<FormattedMessage id="filters" />}
      value={appliedValues}
      items={items}
      onChange={({ name: filterName, value, checked }) => {
        if ([POOL_ID_FILTER].includes(filterName)) {
          onFilterAdd({
            [filterName]: checked ? getPoolIdWithSubPools(value) : value
          });
        } else {
          onFilterAdd({ [filterName]: value });
        }
      }}
      onApply={({ name, value }) => {
        onFilterAdd({
          [name]: value
        });
      }}
      onClear={({ filterName, filterValue }) => {
        onFilterDelete(filterName, filterValue);
      }}
      onClearAll={onFiltersDelete}
    />
  );

export default ExpensesFilters;
