import { ML_PUBLIC_RUN } from "urls";
import BaseRoute from "./baseRoute";

class PublicMlRun extends BaseRoute {
  isTokenRequired = false;

  page = "PublicMlRun";

  link = ML_PUBLIC_RUN;

  layout = null;
}

export default new PublicMlRun();
