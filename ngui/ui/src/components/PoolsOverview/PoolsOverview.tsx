import { useMemo } from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ActionBar from "components/ActionBar";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import PageContentWrapper from "components/PageContentWrapper";
import PoolsTable from "components/PoolsTable";
import PoolTypeIcon from "components/PoolTypeIcon";
import Tooltip from "components/Tooltip";
import RangePickerFormContainer from "containers/RangePickerFormContainer";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { ASSIGNMENT_RULES } from "urls";
import { DATE_RANGE_TYPE, POOL_TYPE_BUSINESS_UNIT } from "utils/constants";
import { SPACING_2 } from "utils/layouts";
import { updateSearchParams } from "utils/network";
import { getRangeCostMap } from "utils/pools";
import { sliceByLimitWithEllipsis } from "utils/strings";
import { PoolExpensesReportDownload, Summary } from "./components";

const MAX_POOL_NAME_LENGTH = 64;

const mergeCostsForRange = (rootPool, rangePool, hasRangeError) => {
  const costById = getRangeCostMap(rangePool, hasRangeError);

  return {
    ...rootPool,
    cost: costById.get(rootPool.id),
    children: (rootPool.children ?? []).map((child) => ({
      ...child,
      cost: costById.get(child.id),
    })),
  };
};

const PoolsOverview = ({
  data = {},
  isLoading = false,
  isDataReady = false,
  isGetPoolAllowedActionsLoading = false,
  expensesRangeData = {},
  isExpensesRangeLoading = false,
  isExpensesRangeError = false,
  startDateTimestamp,
  endDateTimestamp,
}) => {
  const { name } = useOrganizationInfo();

  const isNameLong = name.length > MAX_POOL_NAME_LENGTH;

  const tablePool = useMemo(
    () => mergeCostsForRange(data, expensesRangeData, isExpensesRangeError),
    [data, expensesRangeData, isExpensesRangeError]
  );

  const applyDates = ({ startDate, endDate }) => {
    updateSearchParams({ startDate, endDate });
  };

  const actionBarDefinition = {
    title: {
      text: (
        <Tooltip title={isNameLong ? name : undefined}>
          <span>{isNameLong ? sliceByLimitWithEllipsis(name, MAX_POOL_NAME_LENGTH) : name}</span>
        </Tooltip>
      ),
      logo: {
        icon: <PoolTypeIcon fontSize="medium" type={POOL_TYPE_BUSINESS_UNIT} hasRightMargin dataTestId="img_type" />,
      },
      dataTestId: "lbl_pool_name",
    },
    items: [
      {
        key: "configureAssignmentRules",
        icon: <AssignmentOutlinedIcon fontSize="small" />,
        messageId: "configureAssignmentRules",
        link: ASSIGNMENT_RULES,
        type: "button",
        dataTestId: "btn_configure_assignment_rules",
      },
    ],
  };

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Grid container spacing={SPACING_2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={SPACING_2}>
              <Box>
                <Summary data={data} isLoading={isLoading} />
              </Box>
              <Box display="flex" alignItems="center" gap={SPACING_2} flexWrap="wrap">
                <PoolExpensesReportDownload startDateTimestamp={startDateTimestamp} endDateTimestamp={endDateTimestamp} />
                <RangePickerFormContainer
                  onApply={applyDates}
                  initialStartDateValue={startDateTimestamp}
                  initialEndDateValue={endDateTimestamp}
                  rangeType={DATE_RANGE_TYPE.POOLS}
                  definedRanges={getBasicRangesSet()}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <PoolsTable
              rootPool={tablePool}
              startDateTimestamp={startDateTimestamp}
              endDateTimestamp={endDateTimestamp}
              isLoadingProps={{
                isGetPoolLoading: isLoading || isExpensesRangeLoading,
                isGetPoolDataReady: isDataReady,
                isGetPoolAllowedActionsLoading,
              }}
            />
          </Grid>
        </Grid>
      </PageContentWrapper>
    </>
  );
};

export default PoolsOverview;
