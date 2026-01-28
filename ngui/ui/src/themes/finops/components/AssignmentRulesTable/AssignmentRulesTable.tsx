import { ComponentProps } from "react";
import { Box } from "@mui/material";
import AssignmentRulesTableBase from "@main/components/AssignmentRulesTable/AssignmentRulesTable";
import { MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY } from "@theme/utils/layouts";

type AssignmentRulesTableBaseProps = ComponentProps<typeof AssignmentRulesTableBase>;

const AssignmentRulesTable = (props: AssignmentRulesTableBaseProps) => (
  <Box
    sx={{
      "header .MuiButton-containedSuccess": MPT_BUTTON_DEFAULT_SUCCESS_TO_PRIMARY
    }}
  >
    <AssignmentRulesTableBase {...props} />
  </Box>
);

export default AssignmentRulesTable;
