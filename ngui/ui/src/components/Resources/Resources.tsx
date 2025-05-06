import { useEffect, useState } from "react";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FormattedMessage, useIntl } from "react-intl";
import ActionBar from "components/ActionBar";
import CopyText from "components/CopyText";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import ExpensesFilters from "components/ExpensesFilters";
import PageContentWrapper from "components/PageContentWrapper";
import { ApplyResourcePerspectiveModal, CreateResourcePerspectiveModal } from "components/SideModalManager/SideModals";
import Tooltip from "components/Tooltip";
import TypographyLoader from "components/TypographyLoader";
import CleanExpensesBreakdownContainer from "containers/CleanExpensesBreakdownContainer";
import ExpensesSummaryContainer from "containers/ExpensesSummaryContainer";
import RangePickerFormContainer from "containers/RangePickerFormContainer";
import ResourceCountBreakdownContainer from "containers/ResourceCountBreakdownContainer";
import TagsBreakdownContainer from "containers/TagsBreakdownContainer";
import { useOpenSideModal } from "hooks/useOpenSideModal";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { useResourceFilters } from "hooks/useResourceFilters";
import {
  CLUSTER_TYPES,
  DAILY_EXPENSES_BREAKDOWN_BY_PARAMETER_NAME,
  DAILY_RESOURCE_COUNT_BREAKDOWN_BY_PARAMETER_NAME,
  getResourcesExpensesUrl,
  RESOURCES_BREAKDOWN_BY_QUERY_PARAMETER_NAME,
  RESOURCES_PERSPECTIVE_PARAMETER_NAME
} from "urls";
import { BREAKDOWN_BUTTON_GROUP_ITEMS, CLEAN_EXPENSES_BREAKDOWN_TYPES, DATE_RANGE_TYPE } from "utils/constants";
import { MPT_SPACING_2 } from "utils/layouts";
import { getQueryParams, updateQueryParams } from "utils/network";
import { isEmpty as isEmptyObject } from "utils/objects";
import { sliceByLimitWithEllipsis } from "utils/strings";
import DividerHorizontal from "../../shared/components/DividerHorizontal/DividerHorizontal";
import LabelColon from "../../shared/components/LabelColon/LabelColon";
import ResponsiveStack from "../../shared/components/ResponsiveStack/ResponsiveStack";
import ButtonGroup from "../ButtonGroup";
import Divider from "../Selector/components/Divider";

const BreakdownLinearSelector = ({ value, onChange }) => {
  const initQueryBreakdownParameter = getQueryParams()[RESOURCES_BREAKDOWN_BY_QUERY_PARAMETER_NAME] || null;
  const [position, setPosition] = useState(() => {
    const initialIndex = BREAKDOWN_BUTTON_GROUP_ITEMS.findIndex((item) => item.id === initQueryBreakdownParameter);
    return initialIndex >= 0 ? initialIndex : 0;
  });

  useEffect(() => {
    updateQueryParams({ [RESOURCES_BREAKDOWN_BY_QUERY_PARAMETER_NAME]: value.name });
  }, [value.name]);

  const handleButtonClick = (newValue) => {
    onChange(newValue);
    setPosition(newValue.index);
  };

  return <ButtonGroup onButtonClick={handleButtonClick} buttons={BREAKDOWN_BUTTON_GROUP_ITEMS} activeButtonIndex={position} />;
};

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
  filters,
  filterValues,
  onApply,
  onFilterAdd,
  onFilterDelete,
  onFiltersDelete,
  requestParams,
  activeBreakdown,
  selectedPerspectiveName,
  perspectives,
  onBreakdownChange,
  onPerspectiveApply,
  isFilterValuesLoading = false
}) => {
  const openSideModal = useOpenSideModal();

  const intl = useIntl();

  const isPerspectiveSelected = selectedPerspectiveName !== undefined;

  const resourceFilters = useResourceFilters(filterValues, filters);

  const items = resourceFilters.getFilterSelectors();
  const appliedValues = resourceFilters.getAppliedValues();

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
            const searchParams = getQueryParams();

            if (activeBreakdown.name === CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES) {
              return {
                breakdownBy: searchParams[DAILY_EXPENSES_BREAKDOWN_BY_PARAMETER_NAME],
                groupBy: {
                  groupBy: searchParams.groupBy,
                  groupType: searchParams.groupType
                }
              };
            }
            if (activeBreakdown.name === CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT) {
              return {
                breakdownBy: searchParams[DAILY_RESOURCE_COUNT_BREAKDOWN_BY_PARAMETER_NAME]
              };
            }
            return {};
          };

          openSideModal(CreateResourcePerspectiveModal, {
            filters: resourceFilters,
            breakdownBy: activeBreakdown.name,
            breakdownData: getBreakdownData()
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
      //   color: "primary",
      //   link: CLUSTER_TYPES,
      //   dataTestId: "btn_configure_cluster_types"
      // }
    ]
  };

  const renderExpensesBreakdown = () => <CleanExpensesBreakdownContainer requestParams={requestParams} />;

  const renderResourcesCountBreakdown = () => <ResourceCountBreakdownContainer requestParams={requestParams} />;

  const renderTagsBreakdown = () => <TagsBreakdownContainer requestParams={requestParams} />;

  const renderContent = {
    [CLEAN_EXPENSES_BREAKDOWN_TYPES.EXPENSES]: renderExpensesBreakdown,
    [CLEAN_EXPENSES_BREAKDOWN_TYPES.RESOURCE_COUNT]: renderResourcesCountBreakdown,
    [CLEAN_EXPENSES_BREAKDOWN_TYPES.TAGS]: renderTagsBreakdown
  }[activeBreakdown.name];

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Grid direction="row" container spacing={3} justifyContent="space-between">
          <Grid item xs={12} className={"MTPBoxShadowRoot"}>
            <Grid xs={12} item>
              <ExpensesSummaryContainer requestParams={requestParams} />
            </Grid>
            <Box className={"MTPBoxShadow"}>
              <ResponsiveStack>
                <LabelColon messageId={"breakdownBy"} />
                <BreakdownLinearSelector value={activeBreakdown} onChange={onBreakdownChange} />
                <DividerHorizontal />
                <LabelColon messageId={"dateRange"} />
                <RangePickerFormContainer
                  onApply={(dateRange) => onApply(dateRange)}
                  initialStartDateValue={startDateTimestamp}
                  initialEndDateValue={endDateTimestamp}
                  rangeType={DATE_RANGE_TYPE.RESOURCES}
                  definedRanges={getBasicRangesSet()}
                  hideLabel
                />
              </ResponsiveStack>
              <Divider style={{ marginTop: MPT_SPACING_2, marginBottom: MPT_SPACING_2 }} />
              <Grid xs={12} item>
                {isFilterValuesLoading ? (
                  <TypographyLoader linesCount={1} />
                ) : (
                  <>
                    <ExpensesFilters
                      items={items}
                      appliedValues={appliedValues}
                      onFilterDelete={onFilterDelete}
                      onFiltersDelete={onFiltersDelete}
                      onFilterAdd={onFilterAdd}
                    />
                  </>
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} item className={"MTPBoxShadowRoot"}>
            <Box>{typeof renderContent === "function" ? renderContent() : null}</Box>
          </Grid>
        </Grid>
      </PageContentWrapper>
    </>
  );
};

export default Resources;
