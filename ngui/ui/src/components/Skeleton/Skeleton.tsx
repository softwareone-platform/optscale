import MuiSkeleton from "@mui/material/Skeleton";
import useStyles from "./Skeleton.styles";
import type { SkeletonProps } from "./types";

const Skeleton = ({ children, fullWidth, ...rest }: SkeletonProps) => {
  const { classes } = useStyles();

  const skeletonClasses = fullWidth ? classes.fullWidth : "";

  return (
    <MuiSkeleton className={skeletonClasses} {...rest}>
      {children}
    </MuiSkeleton>
  );
};

export default Skeleton;
