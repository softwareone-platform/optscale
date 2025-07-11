import { Box } from "@mui/material";
import InlineSeverityAlert, { InlineSeverityAlertProps } from "components/InlineSeverityAlert";

type TableDescriptionProps = {
  position: "top" | "bottom";
  alertProps: InlineSeverityAlertProps;
};

const PageContentDescription = ({ position, alertProps }: TableDescriptionProps) => (
  <Box mt={position === "bottom" ? 2 : 0} mb={position === "top" ? 2 : 0}>
    <InlineSeverityAlert {...alertProps} />
  </Box>
);

export default PageContentDescription;
