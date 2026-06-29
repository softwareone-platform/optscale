import { ComponentProps } from "react";
import { Box } from "@mui/material";
import OrganizationConstraintBase from "@main/components/OrganizationConstraint/OrganizationConstraint";
import {
  MPT_BOX_WHITE_SHADOW_RADIUS_2,
  MPT_BUTTON_TEXT_PRIMARY_TO_DANGER,
  MPT_SPACING_2,
  MPT_SPACING_3
} from "@theme/utils/layouts";

type OrganizationConstraintProps = ComponentProps<typeof OrganizationConstraintBase>;

const OrganizationConstraint = (props: OrganizationConstraintProps) => (
  <Box
    sx={{
      "& #page-content-wrapper > .MuiStack-root": MPT_BOX_WHITE_SHADOW_RADIUS_2,
      "& .MuiTypography-subtitle1": { marginBottom: MPT_SPACING_2 },
      "& #page-content-wrapper > .MuiStack-root > div > div": { minHeight: MPT_SPACING_3 },
      " & #action_bar_actions .MuiBox-root:last-of-type .MuiButton-colorPrimary": MPT_BUTTON_TEXT_PRIMARY_TO_DANGER
    }}
  >
    <OrganizationConstraintBase {...props} />
  </Box>
);

export default OrganizationConstraint;
