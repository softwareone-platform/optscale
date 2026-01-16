import { ComponentProps } from "react";
import { Box } from "@mui/material";
import AssignmentRulesRulesBase from "@main/components/AssignmentRules/AssignmentRules";
import { MPT_BOX_SHADOW_STYLES } from "@theme/utils/layouts";

type AssignmentRulesTableBaseProps = ComponentProps<typeof AssignmentRulesRulesBase>;

const AssignmentRulesRules = (props: AssignmentRulesTableBaseProps) => (
  <Box
    sx={{
      "#page-content-wrapper > .MuiBox-root": MPT_BOX_SHADOW_STYLES
    }}
  >
    <AssignmentRulesRulesBase {...props} />
  </Box>
);

export default AssignmentRulesRules;
