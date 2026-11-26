import { MFA_ENROLLMENT } from "urls";
import BaseRoute from "utils/routes/baseRoute";

class MfaEnrollmentRoute extends BaseRoute {
  isTokenRequired = false;

  page = "MfaEnrollment";

  link = MFA_ENROLLMENT;

  layout = null;
}

export default new MfaEnrollmentRoute();
