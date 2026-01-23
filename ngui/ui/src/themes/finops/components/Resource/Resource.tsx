import { ComponentProps } from "react";
import { Box } from "@mui/material";
import ResourceBase from "@main/components/Resource/Resource";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_SPACING_1, MPT_SPACING_2 } from "@theme/utils/layouts";

type ResourceProps = ComponentProps<typeof ResourceBase>;

const Resource = (props: ResourceProps) => (
  <Box
    sx={{
      "& #page-content-wrapper > .MuiGrid-root > .MuiGrid-root:nth-of-type(2)": {
        ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
        margin: MPT_SPACING_2,
        paddingTop: MPT_SPACING_1
      }
    }}
  >
    <ResourceBase {...props} />
  </Box>
);

export default Resource;
