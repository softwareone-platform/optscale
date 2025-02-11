import Grid from "@mui/material/Grid";
import Button from "components/Button";
import { MPT_SPACING_2 } from "../../utils/layouts";

const ButtonSwitch = ({ buttons }) => (
  <Grid container width={"auto"} gap={MPT_SPACING_2}>
    {buttons.map((button) => {
      const { messageId, link, icon } = button;
      return <Button key={messageId} messageId={messageId} link={link} color="primary" size="large" startIcon={icon} />;
    })}
  </Grid>
);

export default ButtonSwitch;
