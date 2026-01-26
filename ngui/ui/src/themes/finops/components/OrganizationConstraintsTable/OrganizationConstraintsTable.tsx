import { ComponentProps } from "react";
import { Box } from "@mui/material";
import OrganizationConstraintsTableBase from "@main/components/OrganizationConstraintsTable/OrganizationConstraintsTable";
import { MPT_BRAND_PRIMARY, MPT_BRAND_PRIMARY_DARKER } from "@theme/utils/layouts";

type OrganizationConstraintsTableProps = ComponentProps<typeof OrganizationConstraintsTableBase>;

const OrganizationConstraintsTable = (props: OrganizationConstraintsTableProps) => (
  <Box
    sx={{
      "& .MuiButton-containedSuccess": {
        backgroundColor: MPT_BRAND_PRIMARY,
        "&:hover": {
          backgroundColor: MPT_BRAND_PRIMARY_DARKER
        }
      }
    }}
  >
    <OrganizationConstraintsTableBase {...props} />
  </Box>
);

export default OrganizationConstraintsTable;
