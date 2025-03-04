import { Stack } from "@mui/material";
import ActionBar from "components/ActionBar";
import CloudCostComparisonTable from "components/CloudCostComparisonTable";
import CloudCostComparisonFiltersForm from "components/forms/CloudCostComparisonFiltersForm";
import PageContentDescription from "components/PageContentDescription/PageContentDescription";
import PageContentWrapper from "components/PageContentWrapper";
import TableLoader from "components/TableLoader";
import { SPACING_1 } from "utils/layouts";

const actionBarDefinition = {
  title: {
    text: "Cloud Cost Comparison",
    dataTestId: "lbl_cloud_cost_comparison"
  }
};

const CloudCostComparison = ({ isLoading, relevantSizes, defaultFormValues, onFiltersApply, cloudProviders, errors }) => (
  <>
    <ActionBar data={actionBarDefinition} />
    <PageContentWrapper>
      <PageContentDescription
        position="top"
        alertProps={{
          messageId: "cloudCostComparisonDescription",
          messageValues: { br: <br /> }
        }}
      />
      <Stack spacing={SPACING_1}>
        <div>
          <CloudCostComparisonFiltersForm onSubmit={onFiltersApply} defaultValues={defaultFormValues} />
        </div>
        <div>
          {isLoading ? (
            <TableLoader />
          ) : (
            <CloudCostComparisonTable relevantSizes={relevantSizes} cloudProviders={cloudProviders} errors={errors} />
          )}
        </div>
      </Stack>
    </PageContentWrapper>
  </>
);

export default CloudCostComparison;
