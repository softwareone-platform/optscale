import { ComponentProps } from "react";
import { Box } from "@mui/material";
import OrganizationConstraintBase from "@main/components/InviteEmployees/InviteEmployees";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2 } from "@theme/utils/layouts";

type OrganizationConstraintProps = ComponentProps<typeof OrganizationConstraintBase>;

const OrganizationConstraint = (props: OrganizationConstraintProps) => (
  <Box
    sx={{
      "& #page-content-wrapper > .MuiBox-root": { ...MPT_BOX_WHITE_SHADOW_RADIUS_2, width: "100%" },
      "& #page-content-wrapper > .MuiBox-root > *": { maxWidth: "780px" }
    }}
  >
    <OrganizationConstraintBase {...props} />
  </Box>
);

export default OrganizationConstraint;
