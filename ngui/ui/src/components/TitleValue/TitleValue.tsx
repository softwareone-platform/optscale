import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import {KU_SPACING_3} from "../../utils/layouts";

const TitleValue = forwardRef(({ children, dataTestId, style = {}, ...rest }, ref) => (
  <Typography
    component="span"
    variant="subtitle1"
    data-test-id={dataTestId}
    style={{ ...style, fontWeight: "bold", fontSize: KU_SPACING_3 }}
    ref={ref}
    {...rest}
  >
    {children}
  </Typography>
));

export default TitleValue;
