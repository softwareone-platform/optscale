import BaseRoute from "@main/utils/routes/baseRoute";
import { PENDING_INVITATIONS } from "@theme/urls";

class PendginInvitationsRoute extends BaseRoute {
  page = "PendingInvitations";

  link = PENDING_INVITATIONS;
}

export default new PendginInvitationsRoute();
