import { Box } from "@mui/material";
import ExpensesMapBase from "@main/pages/ExpensesMap/ExpensesMap";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_SPACING_1, MPT_SPACING_3 } from "@theme/utils/layouts";

const ExpensesMap = () => (
  <Box
    sx={{
      "& #page-content-wrapper": {
        ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
        margin: MPT_SPACING_3,
        paddingTop: MPT_SPACING_1
      }
    }}
  >
    <ExpensesMapBase />
  </Box>
);

export default ExpensesMap;
