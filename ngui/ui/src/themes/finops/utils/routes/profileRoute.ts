import { PROFILE } from "@theme/urls";
import BaseRoute from "@theme/utils/routes/baseRoute";

class ProfileRoute extends BaseRoute {
  page = "Profile";

  link = PROFILE;
}

export default new ProfileRoute();
