import Filters from "components/Filters";
import { RESOURCE_FILTERS } from "components/Filters/constants";
import { useCurrentEmployee } from "./coreData/useCurrentEmployee";

export const useResourceFilters = (filterValues, appliedFilters) => {
  const { id: currentEmployeeId } = useCurrentEmployee();

  const scopeInfo = { currentEmployeeId };

  return new Filters({
    filters: RESOURCE_FILTERS,
    filterValues,
    appliedFilters,
    scopeInfo
  });
};
