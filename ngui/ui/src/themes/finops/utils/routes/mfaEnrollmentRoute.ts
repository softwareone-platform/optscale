import { MFA_ENROLLMENT } from "@theme/urls";
import BaseRoute from "@theme/utils/routes/baseRoute";

class MfaEnrollmentRoute extends BaseRoute {
  isTokenRequired = false;

  page = "MfaEnrollment";

  link = MFA_ENROLLMENT;

  layout = null;
}

export default new MfaEnrollmentRoute();
