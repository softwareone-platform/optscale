import { ReactNode } from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Logo from "components/Logo";
import TopAlertWrapper from "components/TopAlertWrapper";
import { ALERT_TYPES } from "components/TopAlertWrapper/constants";
import { SPACING_2, SPACING_1 } from "utils/layouts";
import useStyles from "./Greeter.styles";

type GreeterProps = {
  content: ReactNode;
};

const Greeter = ({ content }: GreeterProps) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const order = [0, 1];

  const gridDefinition = [
    {
      key: "form",
      children: (
        <Stack className={classes.wrapper} spacing={SPACING_1}>
          <div>
            <Logo width={200} dataTestId="img_logo" />
            <h1>FinOps for Cloud</h1>
          </div>
          <div>{content}</div>
        </Stack>
      ),
      className: classes.centeredFlexColumnDirection
    },
    {
      key: "bannerBackground",
      className: classes.centeredFlexColumnDirection,
      children: <div className={classes.imageWithCaptionWrapper} />
    }
  ];

  const spacing = SPACING_2;
  const halfSpacing = spacing / 2;

  return (
    <>
      <TopAlertWrapper blacklistIds={[ALERT_TYPES.DATA_SOURCES_ARE_PROCESSING, ALERT_TYPES.DATA_SOURCES_PROCEEDED]} />
      <div
        style={{
          padding: theme.spacing(halfSpacing)
        }}
      >
        <Grid
          sx={{
            m: -halfSpacing
          }}
          spacing={spacing}
          container
          className={classes.root}
        >
          {order.map((gridIndex) => {
            const { key, children = null, className = "" } = gridDefinition[gridIndex];
            return (
              <Grid
                sx={{
                  p: spacing
                }}
                key={key}
                md={6}
                xs={12}
                item
                className={cx(gridIndex % 2 === 0 ? classes.leftSideGrid : classes.rightSideGrid, className)}
              >
                {children}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Greeter;
