import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { MPT_PAGE_WRAPPER_STYLES } from "@theme/utils/layouts";

interface PageContentWrapperProps {
  children: ReactNode;
}
const PageContentWrapper = ({ children }: PageContentWrapperProps) => (
  <Box sx={MPT_PAGE_WRAPPER_STYLES} id={"page-content-wrapper"}>
    {children}
  </Box>
);

export default PageContentWrapper;
