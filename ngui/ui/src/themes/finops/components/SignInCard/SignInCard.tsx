import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MockedApiDevPanelSlot from "@theme/components/MockedApiDevPanelSlot";
import Logo from "components/Logo";
import { SPACING_3 } from "utils/layouts";
import useStyles from "./SignInCard.styles";

/** A step before the app, as one card on the page background — the invitation screen's look, without `Greeter`'s banner. */
const SignInCard = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.screen}>
      <MockedApiDevPanelSlot />
      <Stack spacing={SPACING_3} className={classes.card} data-test-id="sign_in_card">
        <div>
          <Logo width={200} dataTestId="img_logo" />
          <Typography variant="h5" component="h1" fontWeight="medium">
            FinOps for Cloud
          </Typography>
        </div>
        {children}
      </Stack>
    </div>
  );
};

export default SignInCard;
