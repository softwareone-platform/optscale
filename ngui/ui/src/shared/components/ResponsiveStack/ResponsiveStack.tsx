import { Stack } from "@mui/material";
import { SPACING_2 } from "../../../utils/layouts";

const ResponsiveStack = ({ children, ...props }) => (
  <Stack direction={{ sm: "column", md: "row" }} spacing={SPACING_2} alignItems={{ sm: "flex-start", md: "center" }} {...props}>
    {children}
  </Stack>
);

export default ResponsiveStack;
