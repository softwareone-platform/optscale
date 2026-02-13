import { ReactNode, forwardRef } from "react";
import { Box } from "@mui/material";
import Typography, { TypographyOwnProps } from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import useStyles from "./KeyValueLabel.styles";

type KeyType =
  | {
      keyMessageId: string;
      keyText?: never;
    }
  | {
      keyText: ReactNode;
      keyMessageId?: never;
    };

type KeyValueLabelProps = KeyType & {
  value: ReactNode;
  variant?: TypographyOwnProps["variant"];
  isBoldValue?: boolean;
  dataTestIds?: {
    typography?: string;
    key?: string;
    value?: string;
  };
  gutterBottom?: boolean;
  sx?: Record<string, unknown>;
};

const KeyValueLabel = forwardRef<HTMLDivElement, KeyValueLabelProps>(
  ({ value, variant, keyMessageId, keyText, isBoldValue = false, dataTestIds = {}, sx = {}, gutterBottom = false }, ref) => {
    const renderValue = () => {
      if (value || value === 0) {
        return value;
      }

      return <>&nbsp;-&nbsp;</>;
    };

    const renderKey = () => (keyMessageId ? <FormattedMessage id={keyMessageId} /> : keyText);

    const { typography: typographyDataTestId, key: keyDataTestId, value: valueDataTestId } = dataTestIds;
    const { classes } = useStyles();
    return (
      <Typography
        ref={ref}
        data-test-id={typographyDataTestId}
        component="div"
        variant={variant}
        gutterBottom={gutterBottom}
        className={classes.typography}
        sx={sx}
      >
        <Box data-test-id={keyDataTestId} className={classes.keyBox}>
          {renderKey()}
          {<>:&nbsp;</>}
        </Box>
        <Box className={classes.valueBox} data-test-id={valueDataTestId}>
          <span style={{ fontWeight: isBoldValue ? "bold" : "normal" }}>{renderValue()}</span>
        </Box>
      </Typography>
    );
  }
);

export default KeyValueLabel;
