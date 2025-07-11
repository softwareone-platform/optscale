import { ReactNode } from "react";

type IconLabelProps = {
  label: ReactNode;
  icon?: ReactNode;
  endIcon?: ReactNode;
  alignItems?: string;
  display?: string;
};

const IconLabel = ({ icon: startIcon, endIcon, label, display = "inline-flex", alignItems = "center" }: IconLabelProps) => (
  <div style={{ display, verticalAlign: "middle", alignItems }}>
    {startIcon && <>{startIcon}&nbsp;</>}
    {label}
    {endIcon && <>&nbsp;{endIcon}</>}
  </div>
);

export default IconLabel;
