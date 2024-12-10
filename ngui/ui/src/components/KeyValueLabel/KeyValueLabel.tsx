import { ReactNode, forwardRef } from "react";
import { Box } from "@mui/material";
import Typography, { TypographyOwnProps } from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import {fontWeight} from "@mui/system";

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
        return value
      }

      return <>&nbsp;-&nbsp;</>;
    };

    const renderKey = () => {
      if (keyMessageId) {
        return <FormattedMessage id={keyMessageId} />;
      }

      return keyText;
    };

    const { typography: typographyDataTestId, key: keyDataTestId, value: valueDataTestId } = dataTestIds;

    return (
      <Typography
        ref={ref}
        data-test-id={typographyDataTestId}
        component="div"
        variant={variant}
        gutterBottom={gutterBottom}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          ...sx
        }}
      >
        <Box
          data-test-id={keyDataTestId}
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            whiteSpace: "normal",
            overflowWrap: "anywhere"
          }}
        >
          {renderKey()}
          {<>:&nbsp;</>}
        </Box>
        <Box
          sx={{
            whiteSpace: "normal",
            overflowWrap: "anywhere",
            fontWeight: 'bold'
          }}
          data-test-id={valueDataTestId}
        >
          <span style={{fontWeight: isBoldValue ? 'bold' : 'normal'}}>{renderValue()}</span>
        </Box>
      </Typography>
    );
  }
);

export default KeyValueLabel;
