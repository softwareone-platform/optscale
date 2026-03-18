import { ComponentProps } from "react";
import { Box } from "@mui/material";
import CreateOrganizationConstraintBase from "@main/components/CreateOrganizationConstraintForm/CreateOrganizationConstraintForm";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_DIVIDER_DIV_BOTTOM, MPT_SPACING_5 } from "@theme/utils/layouts";

type CreateOrganizationConstraintProps = ComponentProps<typeof CreateOrganizationConstraintBase>;

const CreateOrganizationConstraint = (props: CreateOrganizationConstraintProps) => (
  <Box
    sx={{
      "& ": MPT_BOX_WHITE_SHADOW_RADIUS_2,
      "& form > div:nth-of-type(2)": MPT_DIVIDER_DIV_BOTTOM,
      "& p.MuiFormLabel-colorPrimary": { color: "transparent", fontSize: 0, minHeight: MPT_SPACING_5 }
    }}
  >
    <CreateOrganizationConstraintBase {...props} />
  </Box>
);

export default CreateOrganizationConstraint;
