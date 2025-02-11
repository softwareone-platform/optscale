import Typography from "@mui/material/Typography";
import useStyles from "./DashedTypography.styles";

const DashedTypography = ({
  className,
  children,
  disablePointerOnHover = false,
  hasRightMargin = false,
  dataTestId,
  chipMode = false,
  ...rest
}) => {
  const { classes, cx } = useStyles();

  const typographyClasses = cx(
    chipMode ? classes.chip : classes.dashed,
    disablePointerOnHover ? "" : classes.cursorPointer,
    hasRightMargin ? classes.right : "",
    className
  );

  return (
    <Typography className={typographyClasses} data-test-id={dataTestId} {...rest}>
      {children}
    </Typography>
  );
};

export default DashedTypography;
