import { ComponentProps } from "react";
import { Box } from "@mui/material";
import RecommendationsTableBase from "@main/containers/RecommendationsOverviewContainer/RecommendationsTable/RecommendationsTable";

type RecommendationsTableBaseProps = ComponentProps<typeof RecommendationsTableBase>;

const RecommendationsTable = (props: RecommendationsTableBaseProps) => (
  <Box className="MuiBox-WhiteCard">
    <RecommendationsTableBase {...props} />
  </Box>
);

export default RecommendationsTable;
