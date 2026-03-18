import { Box } from "@mui/material";
import RecommendationsBase from "@main/pages/Recommendations/Recommendations";
import { MPT_ALERTS_INFO_1 } from "@theme/utils/layouts";

const Recommendations = () => (
  <Box sx={{ "#action_bar_actions > div:last-of-type button": { background: MPT_ALERTS_INFO_1 } }}>
    <RecommendationsBase />
  </Box>
);

export default Recommendations;
