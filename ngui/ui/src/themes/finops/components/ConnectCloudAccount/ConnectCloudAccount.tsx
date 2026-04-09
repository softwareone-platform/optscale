import { ComponentProps } from "react";
import { Box } from "@mui/material";
import ConnectCloudAccountBase from "@main/components/ConnectCloudAccount/ConnectCloudAccount";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_SPACING_3 } from "@theme/utils/layouts";

type ConnectCloudAccountProps = ComponentProps<typeof ConnectCloudAccountBase>;

const ConnectCloudAccount = (props: ConnectCloudAccountProps) => (
  <Box
    sx={{
      "& #page-content-wrapper": {
        ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
        margin: MPT_SPACING_3
      }
    }}
  >
    <ConnectCloudAccountBase {...props} />
  </Box>
);

export default ConnectCloudAccount;
