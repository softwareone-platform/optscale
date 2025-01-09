import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

const ExpensesBreakdownLayoutWrapper = ({ top, center: { left: centerLeft, right: centerRight }, bottom }) => (
  <Grid container>
    {top}
    {centerLeft && (
      <Grid item xs={12} md={centerRight ? 9 : 12}>
        <Box className={"MTPBoxShadow"}>{centerLeft}</Box>
      </Grid>
    )}
    {centerRight ? (
      <Grid item xs={12} md={3}>
        <Box className={"MTPBoxShadow"}>{centerRight}</Box>
      </Grid>
    ) : null}
    {bottom && (
      <Grid item xs={12}>
        <Box className={"MTPBoxShadow"}>{bottom}</Box>
      </Grid>
    )}
  </Grid>
);

export default ExpensesBreakdownLayoutWrapper;
