import React, { useEffect } from "react";
import useStyles from "./MptTableGradientOverlay.styles";

interface TableGradientOverlayProps {
  containerWithScrollRef: React.RefObject<HTMLElement>;
}

const MptTableGradientOverlay: React.FC<TableGradientOverlayProps> = ({ containerWithScrollRef }) => {
  const { classes } = useStyles();

  useEffect(() => {
    const container = containerWithScrollRef.current;

    const updateGradientVisibility = () => {
      if (container) {
        const isScrollable = container.scrollWidth > container.clientWidth;
        const atScrollEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        const atScrollStart = container.scrollLeft === 0;

        const leftGradient = container.parentElement?.querySelector(".leftGradient");
        const rightGradient = container.parentElement?.querySelector(".rightGradient");

        if (leftGradient) {
          leftGradient.classList.toggle("gradientActive", isScrollable && !atScrollStart);
        }

        if (rightGradient) {
          rightGradient.classList.toggle("gradientActive", isScrollable && !atScrollEnd);
        }
      }
    };

    if (container) {
      container.addEventListener("scroll", updateGradientVisibility);
      window.addEventListener("resize", updateGradientVisibility);

      // Initial check
      updateGradientVisibility();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateGradientVisibility);
        window.removeEventListener("resize", updateGradientVisibility);
      }
    };
  }, [containerWithScrollRef]);

  return (
    <>
      <div className={`leftGradient ${classes.tableLeftGradientOverlay}`} />
      <div className={`rightGradient ${classes.tableRightGradientOverlay}`} />
    </>
  );
};

export default MptTableGradientOverlay;
