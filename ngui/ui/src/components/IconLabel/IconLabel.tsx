import { ReactNode } from "react";

type IconLabelProps = {
  label: ReactNode;
  icon?: ReactNode;
  endIcon?: ReactNode;
};

const IconLabel = ({ icon: startIcon, endIcon, label }: IconLabelProps) => (
  <div style={{ display: "inline-flex", verticalAlign: "middle", alignItems: "center" }}>
    {startIcon && <>{startIcon}&nbsp;</>}
    {label}
    {endIcon && <>&nbsp;{endIcon}</>}
  </div>
);

export default IconLabel;
