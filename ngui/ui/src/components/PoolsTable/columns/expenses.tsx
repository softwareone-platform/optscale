import ExpensesTableHeader from "components/ExpensesTableHeader";
import FormattedMoney from "components/FormattedMoney";
import TextWithDataTestId from "components/TextWithDataTestId";
import { FORMATTED_MONEY_TYPES } from "utils/constants";
import { CELL_EMPTY_VALUE } from "utils/tables";

const expenses = ({ defaultSort, startDateTimestamp, endDateTimestamp } = {}) => ({
  header: (
    <TextWithDataTestId dataTestId="lbl_expenses">
      <ExpensesTableHeader startDateTimestamp={startDateTimestamp} endDateTimestamp={endDateTimestamp} />
    </TextWithDataTestId>
  ),
  accessorKey: "cost",
  cell: ({ cell }) => {
    const cost = cell.getValue();
    return cost === undefined ? CELL_EMPTY_VALUE : <FormattedMoney type={FORMATTED_MONEY_TYPES.COMMON} value={cost} />;
  },
  defaultSort,
  columnSelector: {
    accessor: "cost",
    messageId: "expenses",
    dataTestId: "btn_toggle_cost",
  },
});

export default expenses;
