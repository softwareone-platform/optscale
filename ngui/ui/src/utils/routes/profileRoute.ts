import { PROFILE } from "urls";
import BaseRoute from "utils/routes/baseRoute";

class ProfileRoute extends BaseRoute {
  page = "Profile";

  link = PROFILE;
}

export default new ProfileRoute();
