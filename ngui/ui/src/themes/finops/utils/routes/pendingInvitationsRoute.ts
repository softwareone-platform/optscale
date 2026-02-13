import { PENDING_INVITATIONS } from "@theme/urls";
import BaseRoute from "@theme/utils/routes/baseRoute";

class PendingInvitationsRoute extends BaseRoute {
  page = "PendingInvitations";

  link = PENDING_INVITATIONS;
}

export default new PendingInvitationsRoute();
