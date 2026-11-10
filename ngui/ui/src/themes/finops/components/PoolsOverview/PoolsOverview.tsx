import { ComponentProps } from "react";
import { Box } from "@mui/material";
import PoolsOverviewBase from "@main/components/PoolsOverview/PoolsOverview";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_SPACING_2 } from "@theme/utils/layouts";

type PoolsOverviewProps = ComponentProps<typeof PoolsOverviewBase>;

const PoolsOverview = (props: PoolsOverviewProps) => (
  <Box
    sx={{
      "& #page-content-wrapper > .MuiGrid-root > .MuiGrid-root:nth-of-type(2)": {
        ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
        margin: MPT_SPACING_2
      }
    }}
  >
    <PoolsOverviewBase {...props} />
  </Box>
);

export default PoolsOverview;
