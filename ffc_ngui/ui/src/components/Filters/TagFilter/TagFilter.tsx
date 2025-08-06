import { FormattedMessage } from "react-intl";
import { intl } from "translations/react-intl-config";
import { TAG_BE_FILTER, TAG_FILTER } from "utils/constants";
import Filter from "../Filter";

class TagFilter extends Filter {
  static filterName = TAG_FILTER;

  static apiName = TAG_BE_FILTER;

  static displayedName = (<FormattedMessage id="tag" />);

  static displayedNameString = intl.formatMessage({ id: "tag" });

  // TODO: Use ajv TS integration to create schema based on types def
  static filterItemSchema = {
    type: "string"
  };

  // TODO: Use ajv TS integration to create schema based on types def
  static appliedFilterSchema = {
    type: "string"
  };

  static _getValue(filterItem) {
    return filterItem;
  }

  static _getDisplayedValueRenderer(filterItem) {
    return filterItem;
  }

  static _getDisplayedValueStringRenderer(filterItem) {
    return filterItem;
  }

  _getAppliedFilterItem(appliedFilter, filterItem) {
    return {
      value: appliedFilter,
      displayedValue: this.constructor.getDisplayedValueRenderer(filterItem),
      displayedValueString: this.constructor.getDisplayedValueStringRenderer(filterItem)
    };
  }
}

export default TagFilter;
