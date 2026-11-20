import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "layouts/MainLayout";

class BaseRoute {
  key = uuidv4();

  link = "";

  page = "";

  // Pre-token pages (the login challenges) render without the main layout.
  layout: typeof MainLayout | null = MainLayout;

  component = lazy(
    () =>
      // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      import(`../../pages/${this.page}/index.ts`)
  );
}

export default BaseRoute;
