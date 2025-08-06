import { useMemo } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { FormattedMessage, FormattedNumber } from "react-intl";
import ApproximatelyZero from "components/ApproximatelyZero";
import BreakdownLabel from "components/BreakdownLabel";
import CircleLabel from "components/CircleLabel";
import HeaderHelperCell from "components/HeaderHelperCell";
import IconButton from "components/IconButton";
import Table from "components/Table";
import TableCellActions from "components/TableCellActions";
import TableLoader from "components/TableLoader";
import TextWithDataTestId from "components/TextWithDataTestId";
import TextWithDate from "components/TextWithDate";
import { isEmpty as isEmptyArray } from "utils/arrays";

const AVERAGE_APPROXIMATE_ZERO_THRESHOLD = 0.5;

const getTotalBreakdownTableData = (counts) =>
  Object.entries(counts).map(([id, { name = "", ...details }]) => ({
    id: id ?? name,
    name,
    ...details
  }));

const ResourceCountBreakdownTable = ({
  colors,
  counts,
  appliedRange,
  isLoading,
  onToggleResourceCountDisplay,
  onToggleAllResourceCountsDisplay,
  hiddenLines,
  breakdownBy
}) => {
  const tableData = useMemo(() => getTotalBreakdownTableData(counts), [counts]);
  const columns = useMemo(
    () => [
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_name">
            <FormattedMessage id="name" />
          </TextWithDataTestId>
        ),
        accessorKey: "name",
        cell: ({ row: { original = {} } }) => (
          <CircleLabel
            figureColor={colors[original.id]}
            label={<BreakdownLabel breakdownBy={breakdownBy} details={original} />}
            textFirst={false}
          />
        )
      },
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_resource_average">
            <TextWithDate
              text={<FormattedMessage id="average" />}
              startDateTimestamp={appliedRange.startSecondsTimestamp}
              endDateTimestamp={appliedRange.endSecondsTimestamp}
            />
          </TextWithDataTestId>
        ),
        accessorKey: "average",
        defaultSort: "desc",
        cell: ({ cell }) => {
          const value = cell.getValue();

          return value <= AVERAGE_APPROXIMATE_ZERO_THRESHOLD ? (
            <ApproximatelyZero />
          ) : (
            <FormattedNumber value={value} maximumFractionDigits={0} />
          );
        }
      },
      {
        header: (
          <HeaderHelperCell
            titleDataTestId="lbl_resource_total"
            title={
              <TextWithDate
                text={<FormattedMessage id="total" />}
                startDateTimestamp={appliedRange.startSecondsTimestamp}
                endDateTimestamp={appliedRange.endSecondsTimestamp}
              />
            }
            helperMessageId="totalResourceCountForSelectedPeriod"
          />
        ),
        accessorKey: "total"
      },
      {
        header: () => {
          const { messageId, Icon } = isEmptyArray(hiddenLines)
            ? {
                messageId: "hideAllBreakdowns",
                Icon: VisibilityOffOutlinedIcon
              }
            : {
                messageId: "showAllBreakdown",
                Icon: VisibilityOutlinedIcon
              };

          return (
            <IconButton
              onClick={() => onToggleAllResourceCountsDisplay()}
              dataTestId="btn_toggle_all"
              tooltip={{
                show: true,
                messageId
              }}
              icon={<Icon />}
            />
          );
        },
        id: "actions",
        enableSorting: false,
        cell: ({ row: { original: { id } = {}, index } }) => {
          const isLineVisible = !hiddenLines.includes(id);
          const { messageId, Icon } = isLineVisible
            ? {
                messageId: "hideBreakdown",
                Icon: VisibilityOffOutlinedIcon
              }
            : {
                messageId: "showBreakdown",
                Icon: VisibilityOutlinedIcon
              };

          return (
            <TableCellActions
              items={[
                {
                  key: "toggle",
                  messageId,
                  icon: <Icon />,
                  dataTestId: `btn_toggle_${index}`,
                  action: () => onToggleResourceCountDisplay(id)
                }
              ]}
            />
          );
        }
      }
    ],
    [
      appliedRange.startSecondsTimestamp,
      appliedRange.endSecondsTimestamp,
      colors,
      breakdownBy,
      hiddenLines,
      onToggleAllResourceCountsDisplay,
      onToggleResourceCountDisplay
    ]
  );

  return isLoading ? (
    <TableLoader columnsCounter={columns.length} showHeader />
  ) : (
    <Table
      withSearch
      data={tableData}
      columns={columns}
      localization={{ emptyMessageId: "noResources" }}
      dataTestIds={{
        container: "resources_count_table"
      }}
      queryParamPrefix="resourceType"
      pageSize={50}
    />
  );
};

export default ResourceCountBreakdownTable;
