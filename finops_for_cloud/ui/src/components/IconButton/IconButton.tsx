import { forwardRef, ReactNode } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MuiIconButton, { type IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";
import { NavLink, type To } from "react-router-dom";
import Tooltip from "components/Tooltip";
import useStyles from "./IconButton.styles";

type IconButtonProps = MuiIconButtonProps & {
  dataTestId: string;
  dataProductTourId?: string;
  icon: ReactNode;
  isLoading?: boolean;
  tooltip?: { placement?: string; messageId?: string; value?: string; show?: boolean };
  customClass?: string;
  href?: string;
  link?: To;
};

const IconButton = forwardRef(
  (
    {
      dataTestId,
      dataProductTourId,
      icon,
      onClick,
      link,
      href,
      customClass,
      isLoading,
      disabled = false,
      color = "primary",
      size = "small",
      type = "button",
      edge = false,
      tooltip = {},
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    const { classes } = useStyles();

    const { show: showTooltip = false, value = "", messageId = "", placement = "top" } = tooltip;

    const renderMuiIconButton = (
      <MuiIconButton
        {...rest}
        ref={ref}
        data-test-id={dataTestId}
        data-product-tour-id={dataProductTourId}
        onClick={onClick}
        disabled={disabled}
        className={customClass}
        size={size}
        edge={edge}
        type={type}
        color={color}
      >
        {icon}
      </MuiIconButton>
    );

    const renderButton = () =>
      showTooltip ? (
        <Tooltip title={value || <FormattedMessage id={messageId} />} placement={placement}>
          <span className={classes.tooltipSpan}>{renderMuiIconButton}</span>
        </Tooltip>
      ) : (
        renderMuiIconButton
      );

    const renderButtonOrLoader = () =>
      isLoading ? <CircularProgress size={24} className={classes.buttonProgress} /> : renderButton();

    const renderLinkButton = () => {
      if (link) {
        return (
          <NavLink color="inherit" to={link}>
            {renderButtonOrLoader()}
          </NavLink>
        );
      }
      return (
        <Link href={href} color="inherit" target="_blank" rel="noopener">
          {renderButtonOrLoader()}
        </Link>
      );
    };

    return link || href ? renderLinkButton() : renderButtonOrLoader();
  }
);

export default IconButton;
