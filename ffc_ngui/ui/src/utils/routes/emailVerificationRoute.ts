import { EMAIL_VERIFICATION } from "urls";
import BaseRoute from "./baseRoute";

class EmailVerificationRoute extends BaseRoute {
  isTokenRequired = false;

  page = "EmailVerification";

  link = EMAIL_VERIFICATION;

  layout = null;
}

export default new EmailVerificationRoute();
