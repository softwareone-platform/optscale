import { forwardRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import SummaryCardPdf from "@main/components/SummaryCard/SummaryCardPdf";
import Backdrop from "components/Backdrop";
import Skeleton from "components/Skeleton";
import SummaryCardContent from "components/SummaryCardContent";
import Tooltip from "components/Tooltip";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import useStyles from "./SummaryCard.styles";

interface CardLayoutProps {
  children: React.ReactNode;
  color: string;
  clickable?: boolean;
  onClick?: () => void;
  cardTestId?: string;
  type: string;
}

interface SummaryCardProps {
  value: React.ReactNode;
  caption: React.ReactNode;
  dataTestIds?: {
    cardTestId?: string;
  };
  icon?: {
    show?: boolean;
    value?: React.ReactNode;
  };
  color?: string;
  isLoading?: boolean;
  help?: {
    show?: boolean;
    messageId?: string;
    dataTestId?: string;
  };
  button?: {
    show?: boolean;
    tooltip?: {
      show?: boolean;
      messageId?: string;
      placement?: "top" | "bottom" | "left" | "right";
    };
    onClick?: () => void;
    link?: string;
  };
  rawValue?: React.ReactNode;
  rawCaption?: React.ReactNode;
  pdfId?: string;
  customContent?: React.ReactNode;
  backdrop?: {
    show?: boolean;
    message?: string;
  };
}

export const SUMMARY_CARD_ICONS = Object.freeze({
  PRIMARY: "primary",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
});

const getCardIcon = (cardType: string, classes: ReturnType<typeof useStyles>["classes"]) =>
  ({
    [SUMMARY_CARD_ICONS.PRIMARY]: "",
    [SUMMARY_CARD_ICONS.SUCCESS]: <CheckCircleIcon className={classes.icon} />,
    [SUMMARY_CARD_ICONS.WARNING]: <ErrorIcon className={classes.icon} />,
    [SUMMARY_CARD_ICONS.ERROR]: <CancelIcon className={classes.icon} />
  })[cardType];

const CardLayout = forwardRef<HTMLDivElement, CardLayoutProps>(
  ({ children, color, clickable, onClick, cardTestId, type, ...rest }, ref) => {
    const { classes, cx } = useStyles({ color });
    const cardClasses = cx(classes.root, clickable ? classes.button : "");
    const cardContentClasses = cx(classes.content, type !== "primary" ? classes.contentWithIcon : "");

    return (
      <Card {...rest} elevation={0} data-test-id={cardTestId} className={cardClasses} onClick={onClick} ref={ref}>
        <CardContent className={cardContentClasses}>
          <Box>
            {type !== "primary" && (
              <Box position="absolute" bottom={"0px"} right={"18px"} fontSize={"18px"}>
                {getCardIcon(type, classes)}
              </Box>
            )}
            {children}
            {clickable && (
              <Box position="absolute" bottom={"25px"} right={"14px"}>
                <ArrowForwardIosIcon />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }
);

const SummaryCard = ({
  value,
  caption,
  dataTestIds,
  icon = {},
  color = "primary",
  isLoading = false,
  help = {},
  button = {},
  rawValue = value,
  rawCaption = caption,
  pdfId,
  customContent,
  backdrop
}: SummaryCardProps) => {
  const theme = useTheme();

  const themeColor = theme.palette[color].card;
  const { currency } = useOrganizationInfo();
  const { cardTestId } = dataTestIds || {};

  const tooltipMessage = button.show && button.tooltip?.show ? <FormattedMessage id={button.tooltip.messageId} /> : "";

  const navigate = useNavigate();

  const cardClickHandler = () => {
    if (!button?.show) {
      return;
    }

    if (typeof button.onClick === "function") {
      button.onClick();
    }

    if (button.link) {
      navigate(button.link);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Skeleton>
          <CardLayout color={themeColor} />
        </Skeleton>
      );
    }

    const clickable = button?.show;

    return (
      <Tooltip title={tooltipMessage} placement={button.tooltip?.placement}>
        <Box height="100%" position="relative">
          {backdrop && backdrop.show ? (
            <>
              <Backdrop customClass="content" />
              <Typography
                sx={{
                  position: "absolute",
                  zIndex: () => theme.zIndex.drawer,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
                variant="body1"
                fontWeight="bold"
                textAlign="center"
              >
                {backdrop.message}
              </Typography>
            </>
          ) : null}
          <CardLayout clickable={clickable} cardTestId={cardTestId} onClick={cardClickHandler} color={themeColor} type={color}>
            {customContent || (
              <SummaryCardContent value={value} caption={caption} dataTestIds={dataTestIds} icon={icon} help={help} />
            )}
            {pdfId ? (
              <SummaryCardPdf pdfId={pdfId} renderData={() => ({ rawValue, rawCaption, color: themeColor, currency })} />
            ) : null}
          </CardLayout>
        </Box>
      </Tooltip>
    );
  };

  return renderContent();
};

export default SummaryCard;
