import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Accordion from "components/Accordion";
import CleanExpensesTable from "components/CleanExpensesTable";
import FormattedMoney from "components/FormattedMoney";
import { getSearchParams, removeSearchParam, updateSearchParams } from "utils/network";

const GROUP_VALUE_QUERY_PARAM_NAME = "groupValue";

const TitleItemsSeparator = () => <div>&nbsp;-&nbsp;</div>;

const AccordionTitle = ({ name, count, totalExpenses }) => (
  <Typography component="div" style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
    <strong
      style={{
        display: "inline-flex"
      }}
    >
      {name}
    </strong>
    <TitleItemsSeparator />
    <FormattedMessage id="resourcesPlural" values={{ count }} />
    <TitleItemsSeparator />
    <FormattedMoney value={totalExpenses} />
  </Typography>
);

const GroupedTables = ({
  groupedResources,
  onAccordionChange,
  getGroupHeaderDataTestId,
  startDateTimestamp,
  endDateTimestamp
}) => {
  const [expanded, setExpanded] = useState({});
  const toggleExpanded = (groupValue, state) => {
    const closeAll = (currentState) => Object.fromEntries(Object.keys(currentState).map((name) => [name, false]));
    setExpanded((currentState) => ({
      ...closeAll(currentState),
      [groupValue]: state
    }));
  };

  useEffect(() => {
    const getDefaultExpandedState = () => Object.fromEntries(groupedResources.map(([groupValue]) => [groupValue, false]));
    const defaultExpandedState = getDefaultExpandedState();

    const { [GROUP_VALUE_QUERY_PARAM_NAME]: groupValueQueryParam = "" } = getSearchParams();

    const validateGroupValueQueryParam = () => {
      const accordionValues = Object.keys(defaultExpandedState);
      return accordionValues.includes(groupValueQueryParam);
    };

    if (groupValueQueryParam && validateGroupValueQueryParam()) {
      const defaultExpandedStateInitializedWithQueryParameter = Object.fromEntries(
        Object.entries(defaultExpandedState).map(([groupValue]) => [groupValue, groupValue === groupValueQueryParam])
      );
      setExpanded(defaultExpandedStateInitializedWithQueryParameter);
    } else {
      setExpanded(defaultExpandedState);
    }

    // cleans up groupValue before running the effects next time
    // usage: remove groupValue when we group by another value
    return () => removeSearchParam(GROUP_VALUE_QUERY_PARAM_NAME);
  }, [groupedResources]);

  const renderCleanExpensesTable = (expenses, { assignmentRuleCreationQueryParameters }) => (
    <CleanExpensesTable
      startDateTimestamp={startDateTimestamp}
      endDateTimestamp={endDateTimestamp}
      disableColumnsSelection
      expenses={expenses}
      assignmentRuleCreationLinkParameters={assignmentRuleCreationQueryParameters}
    />
  );

  return groupedResources.map(
    ([groupValue, { displayedGroupName, count, totalExpenses, expenses, assignmentRuleCreationQueryParameters }], index) => {
      const isExpanded = !!expanded[groupValue]; // expanded.key undefined on the mount
      return (
        <Accordion
          key={groupValue}
          expanded={isExpanded}
          onChange={(_, expandedAccordionState) => {
            toggleExpanded(groupValue, expandedAccordionState);
            // override query param on open
            if (expandedAccordionState) {
              updateSearchParams({
                [GROUP_VALUE_QUERY_PARAM_NAME]: groupValue
              });
            } else {
              // remove query param on close
              removeSearchParam(GROUP_VALUE_QUERY_PARAM_NAME);
            }
            if (typeof onAccordionChange === "function") {
              onAccordionChange();
            }
          }}
          headerDataTestId={typeof getGroupHeaderDataTestId === "function" ? getGroupHeaderDataTestId(index) : undefined}
        >
          <AccordionTitle name={displayedGroupName} count={count} totalExpenses={totalExpenses} />
          {isExpanded && renderCleanExpensesTable(expenses, { assignmentRuleCreationQueryParameters })}
        </Accordion>
      );
    }
  );
};

export default GroupedTables;
