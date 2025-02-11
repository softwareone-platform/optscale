import LinearSelector from "components/LinearSelector";
import { getPoolIdWithSubPools } from "urls";
import { isEmpty } from "utils/arrays";
import { POOL_ID_FILTER } from "utils/constants";
import LabelColon from "../../shared/components/LabelColon/LabelColon";

const ExpensesFilters = ({ items, appliedValues, onFilterAdd, onFilterDelete, onFiltersDelete }) =>
  !isEmpty(items) && (
    <LinearSelector
      label={<LabelColon messageId="filters" />}
      value={appliedValues}
      items={items}
      exposeFirstItem
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
