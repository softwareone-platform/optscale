import { forwardRef, ReactNode } from "react";
import { TooltipProps as MuiTooltipProps } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";
import { NavLink, NavLinkProps } from "react-router-dom";
import Tooltip from "components/Tooltip";
import { ExclusiveUnion } from "utils/types";
import useStyles from "./Button.styles";

type TooltipTitle = ExclusiveUnion<{
  value: ReactNode;
  messageId: string;
  body: ReactNode;
}>;

type TooltipProps = {
  show: boolean;
  placement?: MuiTooltipProps["placement"];
} & TooltipTitle;

type NavProps = ExclusiveUnion<{
  link?: NavLinkProps["to"];
  href?: string;
}>;

type ButtonText = ExclusiveUnion<{
  text: string;
  messageId: string;
  pepega: string;
}>;

type ButtonProps = MuiButtonProps &
  ButtonText &
  NavProps & {
    dataTestId?: string;
    dataProductTourId?: string;
    customClass?: string;
    dashedBorder?: boolean;
    uppercase?: boolean;
    download?: boolean | string;
    tooltip?: TooltipProps;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      dataTestId,
      dataProductTourId,
      messageId,
      text,
      onClick,
      link,
      download,
      href,
      customClass,
      dashedBorder = false,
      size = "small",
      variant = "outlined",
      uppercase = false,
      disabled = false,
      color = "info",
      type = "button",
      tooltip,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const { classes, cx } = useStyles();

    const {
      show: showTooltip = false,
      value = "",
      messageId: tooltipMessageId = "",
      body,
      placement = "bottom"
    } = tooltip || {};

    const buttonClasses = cx(
      classes.button,
      uppercase ? classes.uppercase : "",
      dashedBorder ? classes.dashed : "",
      customClass || ""
    );

    const button = (
      <MuiButton
        {...rest}
        ref={ref}
        color={color}
        className={buttonClasses}
        data-test-id={dataTestId}
        data-product-tour-id={dataProductTourId}
        onClick={onClick}
        disabled={disabled}
        variant={variant}
        size={size}
        type={type}
      >
        {messageId ? <FormattedMessage id={messageId} /> : text}
      </MuiButton>
    );

    // We need span here to be able to add a tooltip for a disabled control
    // https://material-ui.com/components/tooltips/#disabled-elements
    const renderButton = () =>
      showTooltip ? (
        <Tooltip title={body || value || <FormattedMessage id={tooltipMessageId} />} placement={placement}>
          <span className={classes.tooltipSpan}>{button}</span>
        </Tooltip>
      ) : (
        button
      );

    // TODO: NGUI-1509. Need to bring the solution to one type(MenuItem, Button, Popover).
    const renderLinkButton = () => {
      if (link) {
        return disabled ? (
          renderButton()
        ) : (
          <NavLink to={link} className={classes.link}>
            {renderButton()}
          </NavLink>
        );
      }
      return disabled ? (
        renderButton()
      ) : (
        <Link href={href} className={classes.link} target="_blank" rel="noopener" download={download}>
          {renderButton()}
        </Link>
      );
    };

    return link || href ? renderLinkButton() : renderButton();
  }
);

export default Button;
