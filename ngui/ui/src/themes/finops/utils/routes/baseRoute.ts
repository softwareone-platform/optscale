import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "@theme/layouts/MainLayout/MainLayout";

class BaseRoute {
  key = uuidv4();

  link = "";

  page = "";

  layout = MainLayout;

  component = lazy(() => {
    if (this.page === "PendingInvitations") {
      return import(`../../pages/${this.page}/index.ts`);
    }
    return import(`../../../../pages/${this.page}/index.ts`);
  });
}

export default BaseRoute;
