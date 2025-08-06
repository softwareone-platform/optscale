import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useMeasure } from "@nivo/core";

/**
 * The same value as in @nivo/tooltip
 * packages/tooltip/src/TooltipWrapper.tsx
 */
const TOOLTIP_OFFSET = 14;

const ChartTooltip = ({ bandData, renderTooltipBody, barsCount }) => {
  const [measureRef, bounds] = useMeasure();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const isLeftHalf = (bandData?.index ?? 0) < barsCount / 2;

  useEffect(() => {
    const xOffset = TOOLTIP_OFFSET + bounds.width / 2;
    const yOffset = TOOLTIP_OFFSET + bounds.height / 2;

    setX(isLeftHalf ? xOffset : -xOffset);
    setY(yOffset);
  }, [bounds.width, bounds.height, isLeftHalf]);

  return (
    <div
      ref={measureRef}
      style={{
        position: "relative",
        pointerEvents: "none",
        // left: x,
        // top: y,
        transform: `translate(${x}px, ${y}px)`,
        // Without this style rule, the tooltip wraps the text incorrectly when isLeftHalf is true.
        // For the bars on the right everything is displayed correctly.
        width: "max-content"
      }}
    >
      <Typography
        sx={(theme) => ({
          background: theme.palette.common.white,
          borderRadius: theme.spacing(0.25),
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px",
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(0.5),
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1)
        })}
        component="div"
      >
        {renderTooltipBody(bandData)}
      </Typography>
    </div>
  );
};

export default ChartTooltip;
