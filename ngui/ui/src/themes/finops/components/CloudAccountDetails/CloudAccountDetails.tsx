import { ComponentProps } from "react";
import { Box } from "@mui/material";
import CloudAccountDetailsBase from "@main/components/CloudAccountDetails/CloudAccountDetails";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_SPACING_2 } from "@theme/utils/layouts";

type CloudAccountDetailsProps = ComponentProps<typeof CloudAccountDetailsBase>;

const CloudAccountDetails = (props: CloudAccountDetailsProps) => (
  <Box
    sx={{
      "& #page-content-wrapper > .MuiGrid-container > .MuiGrid-item:nth-of-type(2)": {
        ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
        margin: MPT_SPACING_2
      }
    }}
  >
    <CloudAccountDetailsBase {...props} />
  </Box>
);

export default CloudAccountDetails;
