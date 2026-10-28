import { MFA_CHALLENGE } from "@theme/urls";
import BaseRoute from "@theme/utils/routes/baseRoute";

class MfaChallengeRoute extends BaseRoute {
  isTokenRequired = false;

  page = "MfaChallenge";

  link = MFA_CHALLENGE;

  layout = null;
}

export default new MfaChallengeRoute();
