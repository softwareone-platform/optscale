import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "@theme/layouts/MainLayout/MainLayout";

/** Pages that only exist in this theme and therefore resolve against the theme page directory. */
const THEME_PAGES = new Set(["PendingInvitations", "MfaChallenge", "MfaEnrollment"]);

class BaseRoute {
  key = uuidv4();

  link = "";

  page = "";

  // Pre-token pages (the login challenges) render without the main layout.
  layout: typeof MainLayout | null = MainLayout;

  component = lazy(() => {
    if (THEME_PAGES.has(this.page)) {
      return import(`../../pages/${this.page}/index.ts`);
    }
    return import(`../../../../pages/${this.page}/index.ts`);
  });
}

export default BaseRoute;
