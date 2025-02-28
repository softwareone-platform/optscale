import { Box, Stack } from "@mui/material";
import Logo from "components/Logo";
import { SPACING_6 } from "utils/layouts";
import ManageInvitations from "./steps/ManageInvitations/StepContainer";

const InitializeContainer = () => (
  <Stack spacing={SPACING_6} alignItems="center">
    <Box>
      <Logo width={200} dataTestId="img_logo" />
    </Box>
    <ManageInvitations />
  </Stack>
);

export default InitializeContainer;
