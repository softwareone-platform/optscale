import { INITIALIZE } from "urls";
import BaseRoute from "./baseRoute";

class InitializeRoute extends BaseRoute {
  page = "Initialize";

  link = INITIALIZE;

  layout = null;
}

export default new InitializeRoute();
