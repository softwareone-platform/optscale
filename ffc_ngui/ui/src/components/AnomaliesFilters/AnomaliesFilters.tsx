import ExpandableList from "components/ExpandableList";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { FILTER_CONFIGS } from "components/Resources/filterConfigs";
import { isEmpty as isEmptyArray } from "utils/arrays";

const MAX_ROWS = 5;

const AnomaliesFilters = ({ filters, showAll = false }) => {
  const filterItems = Object.values(FILTER_CONFIGS).flatMap((config) => {
    if (config.type === "selection") {
      const appliedFilters = filters[config.apiName] ?? [];

      if (isEmptyArray(appliedFilters)) {
        return [];
      }

      return appliedFilters.map((appliedFilter) => {
        const value = config.transformers.getValue(appliedFilter);

        return {
          key: `${config.id}-${value}`,
          filterName: config.label,
          filterValue: config.renderPerspectiveItem(value, appliedFilters)
        };
      });
    }

    if (config.type === "range") {
      const from = filters[config.fromApiName];
      const to = filters[config.toApiName];

      if (!from && !to) {
        return [];
      }

      return [
        {
          key: `${config.id}-${from}-${to}`,
          filterName: config.label,
          filterValue: config.renderPerspectiveItem({ from, to })
        }
      ];
    }

    return [];
  });

  return (
    <ExpandableList
      items={filterItems}
      render={({ key, filterName, filterValue }) => (
        <KeyValueLabel isBoldValue key={key} keyText={filterName} value={filterValue} />
      )}
      maxRows={showAll ? filters.length : MAX_ROWS}
    />
  );
};

export default AnomaliesFilters;
