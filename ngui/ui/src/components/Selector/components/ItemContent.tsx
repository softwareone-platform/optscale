import { type ElementType, type ReactNode } from "react";
import { TooltipProps } from "@mui/material";
import { Box } from "@mui/system";
import Tooltip from "components/Tooltip";

type ItemContentProps = {
  children: ReactNode;
  tooltip?: {
    title: ReactNode;
    placement?: TooltipProps["placement"];
  };
  icon?: {
    IconComponent: ElementType;
    placement?: "start" | "end";
    tooltipTitle?: ReactNode;
  };
};

const ItemContent = ({ icon, tooltip, children }: ItemContentProps) => {
  if (icon) {
    const { placement = "start", IconComponent, tooltipTitle: iconTooltipTitle } = icon;

    const iconElement = (
      <Tooltip title={iconTooltipTitle}>
        <Box
          mr={placement === "start" ? "0.2rem" : 0}
          ml={placement === "end" ? "0.2rem" : 0}
          display="flex"
          alignItems="center"
        >
          <IconComponent fontSize="small" />
        </Box>
      </Tooltip>
    );

    const renderChildren = () => (
      <Tooltip title={tooltip?.title ?? undefined} placement={tooltip?.placement}>
        <span>{children}</span>
      </Tooltip>
    );

    return (
      <Box display="flex" alignItems="center">
        {placement === "start" && iconElement}
        {renderChildren()}
        {placement === "end" && iconElement}
      </Box>
    );
  }

  return (
    <Tooltip title={tooltip?.title ?? undefined} placement={tooltip?.placement}>
      <span>{children}</span>
    </Tooltip>
  );
};

export default ItemContent;
