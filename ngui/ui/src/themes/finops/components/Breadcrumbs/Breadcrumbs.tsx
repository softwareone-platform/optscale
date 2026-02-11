import { ComponentProps } from "react";
import { Box } from "@mui/material";
import BreadcrumbsOriginal from "@main/components/Breadcrumbs/Breadcrumbs";

type BreadcrumbsProps = ComponentProps<typeof BreadcrumbsOriginal>;

const Breadcrumbs = (props: BreadcrumbsProps) => (
  <Box sx={{ "& ol": { flexWrap: "nowrap" } }}>
    <BreadcrumbsOriginal {...props} />
  </Box>
);

export default Breadcrumbs;
