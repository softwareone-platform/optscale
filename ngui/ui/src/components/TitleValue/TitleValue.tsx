import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import { MPT_SPACING_2 } from "../../utils/layouts";

const TitleValue = forwardRef(({ children, dataTestId, style = {}, ...rest }, ref) => (
  <Typography
    component="span"
    variant="subtitle1"
    data-test-id={dataTestId}
    style={{ fontWeight: "normal", fontSize: MPT_SPACING_2, ...style }}
    ref={ref}
    {...rest}
  >
    {children}
  </Typography>
));

export default TitleValue;
