import { ComponentProps } from "react";
import { Box } from "@mui/material";
import OrganizationConstraintsTableBase from "@main/components/OrganizationConstraintsTable/OrganizationConstraintsTable";
import { MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY } from "@theme/utils/layouts";

type OrganizationConstraintsTableProps = ComponentProps<typeof OrganizationConstraintsTableBase>;

const OrganizationConstraintsTable = (props: OrganizationConstraintsTableProps) => (
  <Box
    sx={{
      "& .MuiButton-containedSuccess": MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY
    }}
  >
    <OrganizationConstraintsTableBase {...props} />
  </Box>
);

export default OrganizationConstraintsTable;
