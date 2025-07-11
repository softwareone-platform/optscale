import { FormControl } from "@mui/material";
import InlineSeverityAlert, { InlineSeverityAlertProps } from "components/InlineSeverityAlert";

type TableDescriptionProps = {
  fullWidth?: boolean;
  alertProps: InlineSeverityAlertProps;
};

const FormContentDescription = ({ alertProps, fullWidth = false }: TableDescriptionProps) => (
  <FormControl fullWidth={fullWidth}>
    <InlineSeverityAlert {...alertProps} />
  </FormControl>
);

export default FormContentDescription;
