import { FormattedMessage } from "react-intl";
import CopyText from "components/CopyText";
import TextWithDataTestId from "components/TextWithDataTestId";
import { CELL_EMPTY_VALUE } from "utils/tables";

const text = ({ id, accessorFn, headerMessageId, headerDataTestId, accessorKey, copy = false, options = {} }) => ({
  header: (
    <TextWithDataTestId dataTestId={headerDataTestId}>
      <FormattedMessage id={headerMessageId} />
    </TextWithDataTestId>
  ),
  id,
  accessorFn,
  accessorKey,
  cell: ({ cell }) => {
    const value = cell.getValue();

    if ([undefined, null, ""].includes(value)) {
      return CELL_EMPTY_VALUE;
    }

    return copy ? (
      <CopyText variant="inherit" text={value}>
        {value}
      </CopyText>
    ) : (
      value
    );
  },
  ...options
});

export default text;
