import { ReactNode } from "react";
import { Typography, TypographyProps } from "@mui/material";

type PlanNameProps = {
  name: ReactNode;
  component?: TypographyProps["component"];
};

const PlanName = ({ name, component = "span" }: PlanNameProps) => (
  <Typography component={component} variant="body1" fontWeight="bold">
    {name}
  </Typography>
);

export default PlanName;
