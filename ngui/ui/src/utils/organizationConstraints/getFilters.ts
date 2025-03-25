import Filters from "components/Filters";
import { RESOURCE_FILTERS } from "components/Filters/constants";
import { TAGGING_POLICY } from "utils/constants";

const getFilterValues = (constraint) => ({
  ...constraint.filters,
  // Implicit filters might be returned in conditions, since they are excluded in available filters, e.g. tagging policies
  ...(constraint.type === TAGGING_POLICY
    ? Object.entries(constraint.definition?.conditions ?? {}).reduce(
        (result, [key, value]) => ({ ...result, [key]: [value] }),
        {}
      )
    : {})
});

export const getFilters = (constraint) =>
  new Filters({
    filters: RESOURCE_FILTERS,
    filterValues: getFilterValues(constraint)
  });
