import { FormattedMessage } from "react-intl";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { FILTER_CONFIGS } from "components/Resources/filterConfigs";
import SubTitle from "components/SubTitle";
import { isEmpty as isEmptyArray } from "utils/arrays";

const ResourcesPerspectiveFilters = ({ perspectiveFilterValues = {}, perspectiveAppliedFilters = {} }) => {
  const filters = Object.values(FILTER_CONFIGS)
    .flatMap((filterConfig) => {
      if (filterConfig.type === "range") {
        const from = perspectiveAppliedFilters[filterConfig.fromName];
        const to = perspectiveAppliedFilters[filterConfig.toName];

        if (!from && !to) {
          return null;
        }

        return (
          <KeyValueLabel
            key={filterConfig.id}
            keyText={filterConfig.label}
            value={filterConfig.renderPerspectiveItem({ from, to })}
          />
        );
      }

      if (filterConfig.type === "selection") {
        const values = perspectiveAppliedFilters[filterConfig.id] ?? [];

        if (isEmptyArray(values)) {
          return null;
        }

        return values.map((value) => (
          <KeyValueLabel
            key={`${filterConfig.id}-${value}`}
            keyText={filterConfig.label}
            value={filterConfig.renderPerspectiveItem(value, perspectiveFilterValues[filterConfig.apiName])}
          />
        ));
      }

      return null;
    })
    .filter(Boolean);

  return (
    <div>
      {isEmptyArray(filters) ? (
        <KeyValueLabel keyMessageId="filters" value="-" />
      ) : (
        <>
          <SubTitle>
            <FormattedMessage id="filters" />
          </SubTitle>
          {filters}
        </>
      )}
    </div>
  );
};

export default ResourcesPerspectiveFilters;
