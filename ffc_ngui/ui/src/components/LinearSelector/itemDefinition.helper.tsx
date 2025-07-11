import { isEmpty as isEmptyArray } from "utils/arrays";
import { LINEAR_SELECTOR_ITEMS_TYPES } from "utils/constants";

export const processItemDefinition = (itemDefinition, values) => {
  const { name, items: popoverItems, type } = itemDefinition;

  const isSelected = values.some(({ name: valueName }) => valueName === name);

  // Skipping all selected items, except multiselector
  if (isSelected && type !== LINEAR_SELECTOR_ITEMS_TYPES.MULTISELECT_POPOVER) {
    return { skip: true, notSelectedPopoverItems: [] };
  }

  let notSelectedPopoverItems = [];

  if (type === LINEAR_SELECTOR_ITEMS_TYPES.POPOVER) {
    const { name: selectedItemName, value: selectedItemValue } = values.find((valueObject) => valueObject.name === name) ?? {};

    notSelectedPopoverItems =
      selectedItemName === name ? popoverItems.filter((el) => el.value !== selectedItemValue) : popoverItems;

    // Skip if there are no items left in the popover
    if (isEmptyArray(notSelectedPopoverItems)) {
      return { skip: true, notSelectedPopoverItems: [] };
    }
  }

  if (type === LINEAR_SELECTOR_ITEMS_TYPES.MULTISELECT_POPOVER) {
    // Skip popover if there are no items
    if (isEmptyArray(popoverItems)) {
      return { skip: true, notSelectedPopoverItems: [] };
    }
    notSelectedPopoverItems = popoverItems;
  }

  return { skip: false, notSelectedPopoverItems };
};
