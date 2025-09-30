import { forwardRef, ReactNode } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import useStyles from "./DashedTypography.styles";

type DashedTypographyProps = {
  className?: string;
  children: ReactNode;
  disablePointerOnHover?: boolean;
  hasRightMargin?: boolean;
  dataTestId?: string;
} & TypographyProps;

const DashedTypography = forwardRef<HTMLElement, DashedTypographyProps>(
  ({ className, children, disablePointerOnHover = false, hasRightMargin = false, dataTestId, ...rest }, ref) => {
    const { classes, cx } = useStyles();

    const typographyClasses = cx(
      classes.dashed,
      disablePointerOnHover ? "" : classes.cursorPointer,
      hasRightMargin ? classes.right : "",
      className
    );
    return (
      <Typography component="span" ref={ref} className={typographyClasses} data-test-id={dataTestId} {...rest}>
        {children}
      </Typography>
    );
  }
);

export default DashedTypography;
