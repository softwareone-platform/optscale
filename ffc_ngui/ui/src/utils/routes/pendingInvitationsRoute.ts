import { PENDING_INVITATIONS } from "urls";
import BaseRoute from "./baseRoute";

class PendginInvitationsRoute extends BaseRoute {
  page = "PendingInvitations";

  link = PENDING_INVITATIONS;
}

export default new PendginInvitationsRoute();
