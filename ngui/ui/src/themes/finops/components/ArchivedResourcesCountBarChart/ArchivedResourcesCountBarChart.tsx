import { ComponentProps } from "react";
import { Box } from "@mui/material";
import ArchivedResourcesCountBarChartBase from "@main/components/ArchivedResourcesCountBarChart/ArchivedResourcesCountBarChart";

type ArchivedResourcesCountBarChartProps = ComponentProps<typeof ArchivedResourcesCountBarChartBase>;

const ArchivedResourcesCountBarChart = (props: ArchivedResourcesCountBarChartProps) => (
  <Box className={"MTPBoxShadow"}>
    <ArchivedResourcesCountBarChartBase {...props} />
  </Box>
);

export default ArchivedResourcesCountBarChart;
