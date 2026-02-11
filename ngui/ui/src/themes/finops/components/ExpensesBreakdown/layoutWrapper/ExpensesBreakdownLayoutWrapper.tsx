import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { MPT_SPACING_2, MPT_SPACING_3 } from "@theme/utils/layouts";

const ExpensesBreakdownLayoutWrapper = ({ top, center: { left: centerLeft, right: centerRight }, bottom }) => (
  <Grid container>
    {top}
    {centerLeft && (
      <Grid item xs={12} md={centerRight ? 9 : 12} paddingTop={MPT_SPACING_2}>
        <Box className={"MTPBoxShadow"} height={"100%"}>
          {centerLeft}
        </Box>
      </Grid>
    )}
    {centerRight ? (
      <Grid item paddingLeft={MPT_SPACING_3} paddingTop={MPT_SPACING_2} xs={12} md={3}>
        <Box className={"MTPBoxShadow"} height={"100%"}>
          {centerRight}
        </Box>
      </Grid>
    ) : null}
    {bottom && (
      <Grid item xs={12} paddingTop={MPT_SPACING_3}>
        <Box className={"MTPBoxShadow"}>{bottom}</Box>
      </Grid>
    )}
  </Grid>
);

export default ExpensesBreakdownLayoutWrapper;
