import { ComponentProps } from "react";
import { Box } from "@mui/material";
import OrganizationConstraintBase from "@main/components/CloudAccountsTable/CloudAccountsTable";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY } from "@theme/utils/layouts";

type OrganizationConstraintProps = ComponentProps<typeof OrganizationConstraintBase>;

const OrganizationConstraint = (props: OrganizationConstraintProps) => (
  <Box
    sx={{
      ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
      "& .MuiButton-containedSuccess": MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY
    }}
  >
    <OrganizationConstraintBase {...props} />
  </Box>
);

export default OrganizationConstraint;
