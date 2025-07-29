import { forwardRef } from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { FormattedMessage } from "react-intl";
import { NavLinkProps } from "react-router-dom";
import { ExclusiveUnion } from "utils/types";

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
      ...rest
    }: ButtonProps,
    ref
  ) => {
    // Build className using the props

    const button = (
      <MuiButton
        {...rest}
        ref={ref}
        color={color}
        className={"sample"}
        data-test-id={dataTestId}
        data-product-tour-id={dataProductTourId}
        onClick={onClick}
        disabled={disabled}
        variant={variant}
        size={size}
        type={type}
      >
        {messageId ? <FormattedMessage id={messageId} /> : text} test123
      </MuiButton>
    );

    const renderButton = () => button;

    return renderButton();
  }
);

export default Button;
