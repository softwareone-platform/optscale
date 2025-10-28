import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FormattedMessage, useIntl } from "react-intl";
import ActionBar from "components/ActionBar";
import CopyText from "components/CopyText";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import PageContentWrapper from "components/PageContentWrapper";
import TagsBreakdownContainer from "components/Resources/containers/TagsBreakdownContainer";
import { ApplyResourcePerspectiveModal, CreateResourcePerspectiveModal } from "components/SideModalManager/SideModals";
import TabsWrapper from "components/TabsWrapper";
import Tooltip from "components/Tooltip";
import TypographyLoader from "components/TypographyLoader";
import ExpensesSummaryContainer from "containers/ExpensesSummaryContainer";
import RangePickerFormContainer from "containers/RangePickerFormContainer";
import { useOpenSideModal } from "hooks/useOpenSideModal";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import {
  DAILY_EXPENSES_BREAKDOWN_BY_PARAMETER_NAME,
  DAILY_META_BREAKDOWN_BY_PARAMETER_NAME,
  DAILY_RESOURCE_COUNT_BREAKDOWN_BY_PARAMETER_NAME,
  getResourcesExpensesUrl,
  RESOURCES_BREAKDOWN_BY_QUERY_PARAMETER_NAME,
  RESOURCES_PERSPECTIVE_PARAMETER_NAME
} from "urls";
import { CLEAN_EXPENSES_BREAKDOWN_TYPES, DATE_RANGE_TYPE } from "utils/constants";
import { getSearchParams } from "utils/network";
import { isEmptyObject } from "utils/objects";
import { sliceByLimitWithEllipsis } from "utils/strings";
import DividerHorizontal from "../../shared/components/DividerHorizontal/DividerHorizontal";
import LabelColon from "../../shared/components/LabelColon/LabelColon";
import ResponsiveStack from "../../shared/components/ResponsiveStack/ResponsiveStack";
import { MPT_SPACING_4 } from "../../utils/layouts";
import { MetaTabContent } from "./components";
import { CleanExpensesBreakdownContainer, ResourceCountBreakdownContainer } from "./containers";
import Filters from "./Filters";

const MAX_PERSPECTIVE_NAME_LENGTH = 60;

const SelectedPerspectiveTitle = ({ perspectiveName }) => {
  const intl = useIntl();

  const { organizationId } = useOrganizationInfo();

  const copyUrl = [
    window.location.origin,
    getResourcesExpensesUrl({
      [RESOURCES_PERSPECTIVE_PARAMETER_NAME]: perspectiveName,
      organizationId
    })
  ].join("");

  const isPerspectiveNameLong = perspectiveName.length > MAX_PERSPECTIVE_NAME_LENGTH;

  return (
    <CopyText text={copyUrl} variant="h6" Icon={LinkOutlinedIcon} copyMessageId="copyUrl">
      <FormattedMessage
        id="value - value"
        values={{
          value1: intl.formatMessage({ id: "resources" }),
          value2: (
            <Tooltip title={isPerspectiveNameLong ? perspectiveName : undefined}>
              <span>
                {isPerspectiveNameLong
                  ? sliceByLimitWithEllipsis(perspectiveName, MAX_PERSPECTIVE_NAME_LENGTH)
                  : perspectiveName}
              </span>
            </Tooltip>
          )
        }}
      />
    </CopyText>
  );
};

const Resources = ({
  startDateTimestamp,
  endDateTimestamp,
  filterValues,
  onApply,
  requestParams,
  activeBreakdown,
  selectedPerspectiveName,
  perspectives,
  onPerspectiveApply,
  appliedFilters,
  onAppliedFiltersChange,
  isFilterValuesLoading = false,
  onBreakdownChange
}) => {
  const openSideModal = useOpenSideModal();

  const intl = useIntl();

  const isPerspectiveSelected = selectedPerspectiveName !== undefined;

  const actionBarDefinition = {
    title: {
      text: selectedPerspectiveName ? (
        <SelectedPerspectiveTitle perspectiveName={selectedPerspectiveName} />
      ) : (
        intl.formatMessage({ id: "resources" })
      ),
      dataTestId: "lbl_resources"
    },
    items: [
      ...(isEmptyObject(perspectives)
        ? []
        : [
            {
              key: "perspectives",
              icon: <AssessmentOutlinedIcon fontSize="small" />,
              messageId: "perspectivesTitle",
              color: "primary",
              type: "button",
              action: () => {
                openSideModal(ApplyResourcePerspectiveModal, {
                  perspectives,
                  appliedPerspectiveName: selectedPerspectiveName,
                  onApply: onPerspectiveApply
                });
              }
            }
          ]),
      {
        key: "savePerspectiveTitle",
        icon: <AddchartOutlinedIcon fontSize="small" />,
        messageId: "savePerspectiveTitle",
        disabled: isPerspectiveSelected,
        type: "button",
        action: () => {
          const getBreakdownData = () => {
            const searchParams = getSearchParams();

            if (activeBreakdown === CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES) {
              return {
                breakdownBy: searchParams[DAILY_EXPENSES_BREAKDOWN_BY_PARAMETER_NAME],
                groupBy: {
                  groupBy: searchParams.groupBy,
                  groupType: searchParams.groupType
                }
              };
            }

            if (activeBreakdown === CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT) {
              return {
                breakdownBy: searchParams[DAILY_RESOURCE_COUNT_BREAKDOWN_BY_PARAMETER_NAME]
              };
            }

            if (activeBreakdown === CLEAN_EXPENSES_BREAKDOWN_TYPES.META) {
              return {
                breakdownBy: searchParams[DAILY_META_BREAKDOWN_BY_PARAMETER_NAME]
              };
            }

            return {};
          };

          openSideModal(CreateResourcePerspectiveModal, {
            breakdownBy: activeBreakdown,
            breakdownData: getBreakdownData(),
            filterValues,
            appliedFilters
          });
        },
        requiredActions: ["EDIT_PARTNER"],
        color: "primary",
        dataTestId: "btn_create_perspective"
      }
      // MPT_TODO: disabled to meet BDR requirements
      // {
      //   key: "configureClusterTypes",
      //   icon: <GroupWorkOutlinedIcon fontSize="small" />,
      //   messageId: "configureClusterTypes",
      //   type: "button",
      //   link: CLUSTER_TYPES,
      //   dataTestId: "btn_configure_cluster_types"
      // }
    ]
  };

  const tabs = [
    {
      title: CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES,
      dataTestId: "tab_expenses",
      node: <CleanExpensesBreakdownContainer requestParams={requestParams} />
    },
    {
      title: CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT,
      dataTestId: "tab_counts",
      node: <ResourceCountBreakdownContainer requestParams={requestParams} />
    },
    {
      title: CLEAN_EXPENSES_BREAKDOWN_TYPES.TAGS,
      dataTestId: "tab_tags",
      node: <TagsBreakdownContainer requestParams={requestParams} />
    },
    {
      title: CLEAN_EXPENSES_BREAKDOWN_TYPES.META,
      dataTestId: "tab_meta",
      node: <MetaTabContent requestParams={requestParams} metaNames={filterValues.meta ?? []} />
    }
  ];

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Grid direction="row" container spacing={3} justifyContent="space-between">
          <Grid item xs={12} className={"MTPBoxShadowRoot"}>
            <ExpensesSummaryContainer requestParams={requestParams} />
          </Grid>
          <Grid item xs={12} className={"MTPBoxShadowRoot"}>
            <Box>
              <ResponsiveStack>
                <LabelColon messageId={"dateRange"} />
                <RangePickerFormContainer
                  onApply={(dateRange) => onApply(dateRange)}
                  initialStartDateValue={startDateTimestamp}
                  initialEndDateValue={endDateTimestamp}
                  rangeType={DATE_RANGE_TYPE.RESOURCES}
                  definedRanges={getBasicRangesSet()}
                />
              </ResponsiveStack>
              <DividerHorizontal verticalSpacing={MPT_SPACING_4} noHorizontalSpacing />
              {isFilterValuesLoading ? (
                <TypographyLoader linesCount={1} />
              ) : (
                <Filters
                  filters={filterValues}
                  appliedFilters={appliedFilters}
                  onAppliedFiltersChange={onAppliedFiltersChange}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} className={"MTPBoxShadowRoot"}>
            <Box>
              <TabsWrapper
                isLoading={isFilterValuesLoading}
                tabsProps={{
                  tabs,
                  activeTab: activeBreakdown,
                  handleChange: (event, value) => {
                    onBreakdownChange(value);
                  },
                  queryTabName: RESOURCES_BREAKDOWN_BY_QUERY_PARAMETER_NAME,
                  defaultTab: CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES,
                  name: "resource-breakdowns"
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </PageContentWrapper>
    </>
  );
};

export default Resources;
