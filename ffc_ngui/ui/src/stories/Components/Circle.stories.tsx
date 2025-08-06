import Grid from "@mui/material/Grid";
import Circle from "components/Circle";

export default {
  component: Circle
};

export const circle = () => (
  <Grid container direction="column">
    <Grid item>
      <Circle color="primary" /> - primary
    </Grid>
    <Grid item>
      <Circle color="secondary" /> - secondary
    </Grid>
    <Grid item>
      <Circle color="error" /> - error
    </Grid>
    <Grid item>
      <Circle color="warning" /> - warning
    </Grid>
    <Grid item>
      <Circle color="success" /> - success
    </Grid>
    <Grid item>
      <Circle color="info" /> - info
    </Grid>
    <Grid item>
      <Circle color="inherit" /> - inherit
    </Grid>
  </Grid>
);
