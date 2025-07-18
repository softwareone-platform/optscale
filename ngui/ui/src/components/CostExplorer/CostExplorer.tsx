import { PictureAsPdf } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CloudIcon from "@mui/icons-material/Cloud";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import ActionBar from "components/ActionBar";
import BarChartLoader from "components/BarChartLoader";
import { getBasicRangesSet } from "components/DateRangePicker/defaults";
import ExpensesBreakdownBarChart from "components/ExpensesBreakdown/BarChart";
import ExpensesBreakdownByPeriodWidget from "components/ExpensesBreakdown/BreakdownByPeriodWidget";
import ExpensesBreakdownSummaryCards from "components/ExpensesBreakdown/SummaryCards";
import PageContentWrapper from "components/PageContentWrapper";
import Tooltip from "components/Tooltip";
import RangePickerFormContainer from "containers/RangePickerFormContainer";
import { useBreakdownData } from "hooks/useBreakdownData";
import { EXPENSES_BY_CLOUD, EXPENSES_BY_OWNER, EXPENSES_BY_POOL, EXPENSES_MAP, getResourcesExpensesUrl } from "urls";
import { PDF_ELEMENTS } from "utils/constants";
import { SPACING_2, SPACING_4 } from "utils/layouts";
import { sliceByLimitWithEllipsis } from "utils/strings";
import LabelColon from "../../shared/components/LabelColon/LabelColon";
import ResponsiveStack from "../../shared/components/ResponsiveStack/ResponsiveStack";
import { EVariantOptions } from "../../shared/models/EVariantOptions";
import { createPdf } from "../../utils/pdf";
import Button from "../Button";
import useStyles from "./CostExplorer.styles";

const breakdownByButtons = [
  { messageId: "source", link: EXPENSES_BY_CLOUD, icon: <CloudIcon /> },
  { messageId: "pool", link: EXPENSES_BY_POOL, icon: <BusinessIcon /> },
  { messageId: "owner", link: EXPENSES_BY_OWNER, icon: <PeopleIcon /> },
  { messageId: "geography", link: EXPENSES_MAP, icon: <PublicIcon /> }
];

const MAX_ORGANIZATION_NAME_LENGTH = 64;

const CostExplorer = ({
  total,
  breakdown,
  previousTotal,
  organizationName,
  isLoading,
  onApply,
  startDateTimestamp,
  endDateTimestamp,
  isInScopeOfPageMockup = false
}) => {
  const navigate = useNavigate();

  const breakdownData = useBreakdownData(breakdown);
  const { classes } = useStyles();

  const isNameLong = organizationName?.length > MAX_ORGANIZATION_NAME_LENGTH;

  const actionBarData = {
    title: {
      text: (
        <FormattedMessage
          id="costExplorerFor"
          values={{
            name: (
              <Tooltip title={isNameLong ? organizationName : undefined}>
                <span>
                  {isNameLong ? sliceByLimitWithEllipsis(organizationName, MAX_ORGANIZATION_NAME_LENGTH) : organizationName}
                </span>
              </Tooltip>
            )
          }}
        />
      ),
      isLoading
    },
    items: [
      {
        key: "costExplorerPdfDownload",
        icon: <PictureAsPdf fontSize="small" />,
        messageId: "download",
        type: "button",
        isLoading,
        action: () => {
          createPdf([
            { type: PDF_ELEMENTS.markup.initPortrait },

            {
              type: PDF_ELEMENTS.basics.fileName,
              value: "%orgName%_expenses_breakdown_%dateRange%",
              parameters: {
                orgName: {
                  data: organizationName,
                  type: "string"
                },
                dateRange: {
                  data: PDF_ELEMENTS.costExplorer.dates,
                  type: "object"
                }
              }
            },

            { type: PDF_ELEMENTS.markup.logo },

            { type: PDF_ELEMENTS.basics.H1, value: "expensesOf", parameters: { data: { name: organizationName } } },

            { id: PDF_ELEMENTS.costExplorer.dates }, // find component on page with that id and call its pdf render
            { id: PDF_ELEMENTS.costExplorer.expensesSummary }, // another component
            { id: PDF_ELEMENTS.costExplorer.previousExpensesSummary },

            { id: PDF_ELEMENTS.costExplorer.periodWidgetTitle },
            { type: PDF_ELEMENTS.markup.spacer },
            { id: PDF_ELEMENTS.costExplorer.barChart },

            { type: PDF_ELEMENTS.markup.footer }
          ]);
        }
      }
    ]
  };

  const renderBarChart = (periodType) => {
    if (isLoading) {
      return (
        <Grid item xs={12}>
          <BarChartLoader />
        </Grid>
      );
    }
    const isBreakdownDataEmpty = Object.values(breakdownData.daily).every((dailyData) =>
      dailyData.every((d) => d.expense === 0)
    );
    if (isBreakdownDataEmpty) {
      return null;
    }
    return (
      <Grid item xs={12}>
        <ExpensesBreakdownBarChart
          periodType={periodType}
          breakdownData={breakdownData}
          isLoading={isLoading}
          pdfId={PDF_ELEMENTS.costExplorer.barChart}
          onClick={
            isInScopeOfPageMockup
              ? undefined
              : (bandDetails) => {
                  navigate(
                    getResourcesExpensesUrl({
                      sStartDate: bandDetails.startDate,
                      sEndDate: bandDetails.endDate
                    })
                  );
                }
          }
        />
      </Grid>
    );
  };

  return (
    <>
      <ActionBar data={actionBarData} />
      <PageContentWrapper>
        <Grid container direction="row" justifyContent="space-between" spacing={SPACING_2}>
          <Grid item xs={12}>
            <ExpensesBreakdownSummaryCards
              total={total}
              previousTotal={previousTotal}
              isLoading={isLoading}
              // MPT_TODO: disabled to meet BDR requirements
              // pdfIds={{
              //   totalExpensesForSelectedPeriod: PDF_ELEMENTS.costExplorer.expensesSummary,
              //   totalExpensesForPreviousPeriod: PDF_ELEMENTS.costExplorer.previousExpensesSummary
              // }}
            />
          </Grid>
          <Grid container item spacing={SPACING_4}>
            <Grid item lg={9}>
              <Box className={"MTPBoxShadow"}>
                <ExpensesBreakdownByPeriodWidget
                  customContent={
                    <ResponsiveStack>
                      <LabelColon messageId={"dateRange"} />
                      <RangePickerFormContainer
                        onApply={onApply}
                        initialStartDateValue={startDateTimestamp}
                        initialEndDateValue={endDateTimestamp}
                        pdfId={PDF_ELEMENTS.costExplorer.dates}
                        rangeType="expenses"
                        hideLabel
                        definedRanges={getBasicRangesSet()}
                      />
                    </ResponsiveStack>
                  }
                  render={(periodType) => (
                    <Grid container spacing={SPACING_2}>
                      {renderBarChart(periodType)}
                    </Grid>
                  )}
                />
              </Box>
            </Grid>

            <Grid item lg={3}>
              <Box className={"MTPBoxShadow"}>
                <LabelColon messageId={"seeExpensesBreakdownBy"} variant={EVariantOptions.SUBTITLE1} />
                <div className={classes.costExplorerSubMenu}>
                  {breakdownByButtons.map(({ messageId, link, icon }) => (
                    <Button
                      key={messageId}
                      messageId={messageId}
                      startIcon={icon}
                      endIcon={<ChevronRight />}
                      link={link}
                      variant="text"
                      color="primary"
                    />
                  ))}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </PageContentWrapper>
    </>
  );
};

export default CostExplorer;
