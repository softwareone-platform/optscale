import { useEffect, useState } from "react";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import ActionBar from "components/ActionBar";
import CopyText from "components/CopyText";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import ExpensesFilters from "components/ExpensesFilters";
import PageContentWrapper from "components/PageContentWrapper";
import { ApplyResourcePerspectiveModal, CreateResourcePerspectiveModal } from "components/SideModalManager/SideModals";
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
import { MPT_SPACING_2, MPT_SPACING_3 } from "utils/layouts";
import { getQueryParams, updateQueryParams } from "utils/network";
import { isEmpty as isEmptyObject } from "utils/objects";
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

  return (
    <CopyText text={copyUrl} variant="h6" Icon={LinkOutlinedIcon} copyMessageId="copyUrl">
      {intl.formatMessage(
        { id: "value - value" },
        { value1: intl.formatMessage({ id: "resources" }), value2: perspectiveName }
      )}
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
      },
      {
        key: "configureClusterTypes",
        icon: <GroupWorkOutlinedIcon fontSize="small" />,
        messageId: "configureClusterTypes",
        type: "button",
        color: "primary",
        link: CLUSTER_TYPES,
        dataTestId: "btn_configure_cluster_types"
      }
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
            <Box>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography variant={"fontWeightBold"} component="div" sx={{ marginRight: MPT_SPACING_2 }}>
                  <FormattedMessage id={"breakdownBy"} />
                  {": "}
                </Typography>
                <BreakdownLinearSelector value={activeBreakdown} onChange={onBreakdownChange} />
                <Divider
                  component="span"
                  style={{ marginLeft: MPT_SPACING_3, marginRight: MPT_SPACING_3, width: "1px" }}
                  flexItem
                  orientation="vertical"
                />
                <Typography variant={"fontWeightBold"} component="div" sx={{ marginRight: MPT_SPACING_2 }}>
                  <FormattedMessage id={"dateRangeUTC"} />
                  {": "}
                </Typography>
                <RangePickerFormContainer
                  onApply={(dateRange) => onApply(dateRange)}
                  initialStartDateValue={startDateTimestamp}
                  initialEndDateValue={endDateTimestamp}
                  rangeType={DATE_RANGE_TYPE.RESOURCES}
                  definedRanges={getBasicRangesSet()}
                  hideLabel
                />
              </div>
              <Divider style={{ marginTop: MPT_SPACING_2, marginBottom: MPT_SPACING_2 }} />
              <Grid xs={12} item>
                {isFilterValuesLoading ? (
                  <TypographyLoader linesCount={1} />
                ) : (
                  <>
                    {/* <Accordion zeroSummaryMinHeight={true} headerDataTestId={'filters-accordion'} sx={{ boxShadow: "none", background: 'none'}}> */}
                    {/*  <div> */}
                    {/*    <Typography variant={'body2'} component="span"> */}
                    {/*      <FormattedMessage id={'filters'}/> */}
                    {/*    </Typography> */}
                    {/*    <Badge */}
                    {/*      badgeContent={selectedFiltersCount} */}
                    {/*      color="primary" */}
                    {/*      style={{marginLeft: "18px"}} */}
                    {/*    /> */}
                    {/*  </div> */}
                    {/*  <ExpensesFilters */}
                    {/*    items={items} */}
                    {/*    appliedValues={appliedValues} */}
                    {/*    onFilterDelete={onFilterDelete} */}
                    {/*    onFiltersDelete={onFiltersDelete} */}
                    {/*    onFilterAdd={onFilterAdd} */}
                    {/*  /> */}
                    {/* </Accordion> */}

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
