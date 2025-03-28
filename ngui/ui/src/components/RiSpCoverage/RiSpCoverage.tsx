import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Circle from "components/Circle";
import RiSpCoverageBarChart, { RI_SP_COVERAGE_COLOR_INDEXES } from "components/RiSpCoverageBarChart";
import RiSpCoverageTable from "components/RiSpCoverageTable";
import RiSpExpensesBarChart, { RI_SP_EXPENSES_COLOR_INDEXES } from "components/RiSpExpensesBarChart";
import SubTitle from "components/SubTitle";
import { useIsUpMediaQuery } from "hooks/useMediaQueries";
import { useToggle } from "hooks/useToggle";
import { RI_SP_CHART_PALETTE } from "theme";
import { MPT_SPACING_1, SPACING_1, SPACING_2 } from "utils/layouts";

const UsageTitle = () => (
  <SubTitle>
    <Box display="flex" alignItems="center" marginBottom={MPT_SPACING_1}>
      <Typography variant={"subtitle1"}>
        <FormattedMessage id="usage" />
      </Typography>
    </Box>
  </SubTitle>
);

const DescriptionMarker = ({ label, color }) => {
  const [firstLabelWord, ...restLabelWords] = label.split(" ");

  return (
    <>
      {/*
      Wrapping the SVG Circle icon and the first label word in a separate span element
      to ensure that the SVG icon and the text are displayed on the same line
      */}
      <span
        style={{
          display: "inline-block"
        }}
      >
        <Circle
          style={{
            fontSize: "10px",
            color
          }}
        />{" "}
        {firstLabelWord}
      </span>{" "}
      {restLabelWords}
    </>
  );
};

const UsageDescription = () => (
  <Typography variant="body2">
    <FormattedMessage
      id="riSpUsageBreakdownDescription"
      values={{
        reservedInstancesMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_COVERAGE_COLOR_INDEXES.RI_USAGE]} />
        ),
        savingPlansMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_COVERAGE_COLOR_INDEXES.SP_USAGE]} />
        ),
        uncoveredUsageMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_COVERAGE_COLOR_INDEXES.UNCOVERED_USAGE]} />
        ),
        br: <br />
      }}
    />
  </Typography>
);

const ExpensesTitle = ({ showSavingsCheckbox }) => {
  const { onChange: toggleShowSavings, checked: showSavings } = showSavingsCheckbox;

  return (
    <SubTitle>
      <Box display="flex" alignItems="center" marginBottom={MPT_SPACING_1}>
        <Typography variant={"subtitle1"}>
          <FormattedMessage id="expenses" />
        </Typography>
        <FormControlLabel
          // A trick to prevent the switch to take extra vertical space. Consider this solution for other places
          style={{ height: 0 }}
          control={<Switch onChange={toggleShowSavings} checked={showSavings} />}
          label={
            <Typography>
              <FormattedMessage id="showSavings" />
            </Typography>
          }
          labelPlacement="start"
        />
      </Box>
    </SubTitle>
  );
};

const ExpensesDescription = () => (
  <Typography variant="body2">
    <FormattedMessage
      id="riSpExpensesBreakdownDescription"
      values={{
        reservedInstancesMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_EXPENSES_COLOR_INDEXES.RI_EXPENSES]} />
        ),
        savingPlansMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_EXPENSES_COLOR_INDEXES.SP_EXPENSES]} />
        ),
        savingsMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_EXPENSES_COLOR_INDEXES.SAVINGS]} />
        ),
        uncoveredExpensesMarker: ([label]) => (
          <DescriptionMarker label={label} color={RI_SP_CHART_PALETTE[RI_SP_EXPENSES_COLOR_INDEXES.UNCOVERED_EXPENSES]} />
        ),
        br: <br />
      }}
    />
  </Typography>
);

const RiSpCoverage = ({ usageBreakdown, expensesBreakdown, isLoadingProps }) => {
  const { isGetUsageBreakdownLoading = false, isGetExpensesBreakdownLoading = false } = isLoadingProps;

  const [showSavings, toggleShowSavings] = useToggle(false);

  const usageTitle = <UsageTitle />;
  const expensesTitle = (
    <ExpensesTitle
      showSavingsCheckbox={{
        onChange: toggleShowSavings,
        checked: showSavings
      }}
    />
  );

  const usageDescription = <UsageDescription />;
  const expensesDescription = <ExpensesDescription />;

  const coverageBarChart = <RiSpCoverageBarChart breakdown={usageBreakdown} isLoading={isGetUsageBreakdownLoading} />;
  const expensesBarChart = (
    <RiSpExpensesBarChart breakdown={expensesBreakdown} isLoading={isGetExpensesBreakdownLoading} showSavings={showSavings} />
  );

  const isUpMd = useIsUpMediaQuery("md");

  return (
    <Grid container rowSpacing={SPACING_1} columnSpacing={SPACING_2}>
      {isUpMd ? (
        <>
          <Grid item xs={6}>
            <Box className={"MTPBoxShadow"} height={"100%"}>
              {usageTitle}
              {usageDescription}
              {coverageBarChart}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={"MTPBoxShadow"}>
              {expensesTitle}
              {expensesDescription}
              {expensesBarChart}
            </Box>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            {usageTitle}
            {usageDescription}
            {coverageBarChart}
          </Grid>
          <Grid item xs={12}>
            {expensesTitle}
            {expensesDescription}
            {expensesBarChart}
          </Grid>
        </>
      )}
      <Grid item xs={12} marginTop={MPT_SPACING_1}>
        <Box className={"MTPBoxShadow"}>
          <RiSpCoverageTable
            breakdown={[...Object.values(usageBreakdown).flat(), ...Object.values(expensesBreakdown).flat()]}
            isLoading={isGetUsageBreakdownLoading || isGetExpensesBreakdownLoading}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RiSpCoverage;
