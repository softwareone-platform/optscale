import { FormattedMessage } from "react-intl";
import LabelColon from "@theme/shared/components/LabelColon/LabelColon";
import ResponsiveStack from "@theme/shared/components/ResponsiveStack/ResponsiveStack";
import ButtonGroup from "components/ButtonGroup";
import Hidden from "components/Hidden";
import Selector, { Item, ItemContent } from "components/Selector";
import { POOL_DETAILS, CLOUD_DETAILS, OWNER_DETAILS, EXPENSES_FILTERBY_TYPES, KUBERNETES_CNR } from "utils/constants";

const filters = [
  { id: EXPENSES_FILTERBY_TYPES.SERVICE, messageId: "service", forTypes: [CLOUD_DETAILS], excludeFor: [KUBERNETES_CNR] },
  {
    id: EXPENSES_FILTERBY_TYPES.REGION,
    messageId: "region",
    forTypes: [CLOUD_DETAILS],
    excludeFor: [KUBERNETES_CNR]
  },
  { id: EXPENSES_FILTERBY_TYPES.NODE, messageId: "node", forTypes: [CLOUD_DETAILS], showOnlyFor: [KUBERNETES_CNR] },
  {
    id: EXPENSES_FILTERBY_TYPES.NAMESPACE,
    messageId: "namespace",
    forTypes: [CLOUD_DETAILS],
    showOnlyFor: [KUBERNETES_CNR]
  },
  { id: EXPENSES_FILTERBY_TYPES.POOL, messageId: "pool", forTypes: [POOL_DETAILS, CLOUD_DETAILS, OWNER_DETAILS] },
  { id: EXPENSES_FILTERBY_TYPES.CLOUD, messageId: "source", forTypes: [POOL_DETAILS, OWNER_DETAILS] },
  { id: EXPENSES_FILTERBY_TYPES.EMPLOYEE, messageId: "owner", forTypes: [POOL_DETAILS, CLOUD_DETAILS] },
  { id: EXPENSES_FILTERBY_TYPES.RESOURCE_TYPE, messageId: "resourceType", forTypes: [CLOUD_DETAILS] }
];

const getButtonsGroup = (type, onClick, dataSourceType) =>
  filters
    .filter(({ forTypes }) => forTypes.includes(type)) // only filters for type
    .filter(({ showOnlyFor }) => !showOnlyFor || showOnlyFor?.includes(dataSourceType)) // only specific filters (i guess it could be refactored to be more readable)
    .filter(({ excludeFor }) => !excludeFor || !excludeFor?.includes(dataSourceType))
    .map((f) => ({ action: () => onClick(f.id), ...f })); // adding action

const getActiveButtonIndex = (buttonsGroup, filterBy) => {
  const index = buttonsGroup.indexOf(buttonsGroup.find((button) => button.id === filterBy));
  return index === -1 ? 0 : index;
};

const ExpensesBreakdownBreakdownByButtonsGroup = ({ type, onClick, filterBy, dataSourceType }) => {
  const buttonsGroup = getButtonsGroup(type, onClick, dataSourceType);
  const activeButtonIndex = getActiveButtonIndex(buttonsGroup, filterBy);

  return (
    <>
      <Hidden mode="up" breakpoint="sm">
        <Selector
          id="breakdown-by-selector"
          labelMessageId="breakdownBy"
          value={buttonsGroup[activeButtonIndex === -1 ? 0 : activeButtonIndex].id}
          onChange={(buttonId) => {
            buttonsGroup.find((button) => button.id === buttonId).action();
          }}
        >
          {buttonsGroup.map((button) => (
            <Item key={button.id} value={button.id}>
              <ItemContent>
                <FormattedMessage id={button.messageId} />
              </ItemContent>
            </Item>
          ))}
        </Selector>
      </Hidden>
      <Hidden mode="down" breakpoint="sm">
        <ResponsiveStack>
          <LabelColon messageId={"breakdownBy"} />
          <ButtonGroup buttons={buttonsGroup} activeButtonIndex={activeButtonIndex} />
        </ResponsiveStack>
      </Hidden>
    </>
  );
};

export default ExpensesBreakdownBreakdownByButtonsGroup;
