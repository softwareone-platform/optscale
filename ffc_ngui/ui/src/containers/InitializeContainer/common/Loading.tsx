import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Title } from "./Title";

const Loading = () => (
  <>
    <Title messageId="initializingOptscale" dataTestId="p_initializing" />
    <Box height={60}>
      <CircularProgress data-test-id="svg_loading" />
    </Box>
  </>
);

export default Loading;
