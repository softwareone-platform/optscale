import FullWidthButton from "@theme/shared/components/FullWidthButton";
import { LOGIN } from "urls";

/** Leaves the sign-in steps for the login page — "Back", or "Sign out" where no session exists yet. */
const BackToLoginButton = ({ messageId = "back", dataTestId = "btn_back_to_login" }) => (
  <FullWidthButton color="secondary" link={LOGIN} messageId={messageId} dataTestId={dataTestId} />
);

export default BackToLoginButton;
