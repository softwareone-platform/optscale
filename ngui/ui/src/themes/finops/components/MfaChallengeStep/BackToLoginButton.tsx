import Button from "components/Button";
import { LOGIN } from "urls";

const BackToLoginButton = () => (
  <Button
    variant="contained"
    color="secondary"
    size="large"
    fullWidth
    link={LOGIN}
    messageId="back"
    dataTestId="btn_back_to_login"
  />
);

export default BackToLoginButton;
