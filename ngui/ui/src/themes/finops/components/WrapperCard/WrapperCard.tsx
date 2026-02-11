import { forwardRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TitleProps, WrapperCardProps } from "@main/components/WrapperCard/types";
import Button from "components/Button";
import IconButton from "components/IconButton";
import Tooltip from "components/Tooltip";
import WidgetTitle from "components/WidgetTitle";
import WrapperCardTitlePdf from "components/WrapperCardTitlePdf/WrapperCardTitlePdf";
import useStyles from "./WrapperCard.styles";

const Title = ({ title, titleButton, dataTestId }: TitleProps) => {
  const titleMessage = <WidgetTitle dataTestId={dataTestId}>{title}</WidgetTitle>;

  if (!titleButton) {
    return titleMessage;
  }

  const { type, tooltip, buttonProps } = titleButton;
  const buttonElement = type === "icon" ? <IconButton {...buttonProps} /> : <Button {...buttonProps} />;

  const button = tooltip ? <Tooltip title={tooltip.title}>{buttonElement}</Tooltip> : buttonElement;

  return button ? (
    <Box display="flex" marginBottom={"20px"} alignItems="center">
      {titleButton.type === "icon" ? titleMessage : <Box mr={1}>{titleMessage}</Box>}
      {button}
    </Box>
  ) : (
    <Box display="flex" marginBottom={"20px"} alignItems="center">
      {titleMessage}
    </Box>
  );
};

const WrapperCard = forwardRef<HTMLDivElement, WrapperCardProps>(
  (
    {
      title,
      titleCaption,
      titleButton,
      dataTestIds,
      children,
      className,
      button,
      needAlign = false,
      titlePdf,
      variant = "elevation",
      ...rest
    },
    ref
  ) => {
    const { classes, cx } = useStyles();

    const {
      wrapper: wrapperDataTestId,
      title: titleDataTestId,
      titleCaption: titleCaptionDataTestId,
      button: buttonDataTestId
    } = dataTestIds || {};
    const { show: showButton, href, link, messageId: buttonTextId } = button || {};

    const mainCardClasses = cx(classes[className], needAlign ? classes.alignedWrapper : "");

    return (
      <>
        <Card data-test-id={wrapperDataTestId} className={mainCardClasses} variant={variant} {...rest} ref={ref}>
          <CardContent className={classes.card}>
            {title && <Title title={title} titleButton={titleButton} dataTestId={titleDataTestId} />}
            {titleCaption && (
              <Typography variant="caption" data-test-id={titleCaptionDataTestId}>
                {titleCaption}
              </Typography>
            )}
            <div className={classes.content}>{children}</div>
          </CardContent>
          {showButton && (
            <CardActions className={classes.actions}>
              <div className={classes.spacer} />
              <Button dataTestId={buttonDataTestId} variant="text" messageId={buttonTextId} link={link} href={href} />
            </CardActions>
          )}
        </Card>
        {titlePdf && <WrapperCardTitlePdf pdfId={titlePdf.id} renderData={titlePdf.renderData} />}
      </>
    );
  }
);

export default WrapperCard;
