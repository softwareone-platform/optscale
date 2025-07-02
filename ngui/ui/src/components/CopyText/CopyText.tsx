import { useState, ReactNode } from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { SxProps, Theme } from "@mui/material/styles";
import Typography, { TypographyOwnProps } from "@mui/material/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage } from "react-intl";
import Tooltip from "components/Tooltip";
import useStyles from "./CopyText.styles";

type CopyTextProps = {
  text: string;
  children?: ReactNode;
  variant?: TypographyOwnProps["variant"];
  dataTestIds?: {
    text?: string;
    button?: string;
  };
  Icon?: typeof FileCopyOutlinedIcon;
  dynamicCopyIcon?: boolean;
  copyMessageId?: string;
  copiedMessageId?: string;
  sx?: SxProps<Theme>;
};

const CopyText = ({
  text,
  children,
  variant,
  dataTestIds = {},
  Icon = FileCopyOutlinedIcon,
  dynamicCopyIcon = false,
  copyMessageId = "copy",
  copiedMessageId = "copied",
  sx = {}
}: CopyTextProps) => {
  const { classes, cx } = useStyles();
  const { text: textDataTestId, button: buttonDataTestId } = dataTestIds;
  const [titleMessageId, setTitleMessageId] = useState(copyMessageId);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseLeave = () => {
    setTitleMessageId(copyMessageId);
    setIsHovered(false);
  };

  return (
    <Typography
      component="span"
      variant={variant}
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        ...sx
      }}
      data-test-id={textDataTestId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children && <span>{children}</span>}
      {dynamicCopyIcon && !isHovered ? null : (
        <Typography
          component="span"
          variant={variant}
          data-test-id={buttonDataTestId}
          className={cx(classes.copyWrapper)}
          sx={(theme) => ({
            paddingLeft: children ? theme.spacing(0.5) : 0,
            ...(dynamicCopyIcon
              ? {
                  position: "absolute",
                  left: "100%"
                }
              : undefined)
          })}
        >
          <CopyToClipboard
            text={text}
            onCopy={(_text: string, result: boolean) => {
              if (result) {
                setTitleMessageId(copiedMessageId);
              }
            }}
          >
            <Tooltip
              leaveDelay={0}
              key={titleMessageId}
              title={<FormattedMessage id={titleMessageId} />}
              placement="top"
              disableFocusListener
              disableTouchListener
            >
              <Icon fontSize="inherit" />
            </Tooltip>
          </CopyToClipboard>
        </Typography>
      )}
    </Typography>
  );
};

export default CopyText;
