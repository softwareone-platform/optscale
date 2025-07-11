import { ReactNode } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "components/Backdrop";

type ContentBackdropLoaderProps = {
  isLoading?: boolean;
  // The size of the component.
  //  * If using a number, the pixel unit is assumed.
  //  * If using a string, you need to provide the CSS unit, e.g. '3rem'.
  size?: string | number;
  children: ReactNode;
};

const ContentBackdropLoader = ({ isLoading = false, size, children }: ContentBackdropLoaderProps) => (
  <Box height="100%" position="relative">
    {isLoading && (
      <Backdrop customClass="contentLoader">
        <CircularProgress size={size} />
      </Backdrop>
    )}
    {children}
  </Box>
);

export default ContentBackdropLoader;
