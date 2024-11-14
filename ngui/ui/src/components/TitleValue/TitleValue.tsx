import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import {KU_SPACING_2} from "../../utils/layouts";

const TitleValue = forwardRef(({ children, dataTestId, style = {}, ...rest }, ref) => (
  <Typography
    component="span"
    variant="subtitle1"
    data-test-id={dataTestId}
    style={{ ...style, fontWeight: "normal", fontSize: KU_SPACING_2 }}
    ref={ref}
    {...rest}
  >
    {children}
  </Typography>
));

export default TitleValue;
