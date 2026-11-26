import * as originalRoutes from "@main/utils/routes";
import BaseRoute from "@theme/utils/routes/baseRoute";
import pendingInvitationsRoute from "@theme/utils/routes/pendingInvitationsRoute";

export const routes = [...originalRoutes.routes, pendingInvitationsRoute];

export default BaseRoute;
