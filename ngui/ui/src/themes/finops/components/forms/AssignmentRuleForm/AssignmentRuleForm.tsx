import { ComponentProps } from "react";
import { Box } from "@mui/material";
import AssignmentRuleFormBase from "@main/components/forms/AssignmentRuleForm/AssignmentRuleForm";
import { MPT_BRAND_TYPE } from "@theme/utils/layouts";

type ResourcesPerspectivesProps = ComponentProps<typeof AssignmentRuleFormBase>;

const ResourcesPerspectives = (props: ResourcesPerspectivesProps) => (
  <Box className={"MTPBoxShadow"} sx={{ "& .MuiFormLabel-root": { color: MPT_BRAND_TYPE } }}>
    <AssignmentRuleFormBase {...props} />
  </Box>
);

export default ResourcesPerspectives;
