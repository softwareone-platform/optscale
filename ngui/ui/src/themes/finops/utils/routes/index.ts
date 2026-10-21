import * as originalRoutes from "@main/utils/routes";
import BaseRoute from "@theme/utils/routes/baseRoute";
import mfaChallengeRoute from "@theme/utils/routes/mfaChallengeRoute";
import mfaEnrollmentRoute from "@theme/utils/routes/mfaEnrollmentRoute";
import pendingInvitationsRoute from "@theme/utils/routes/pendingInvitationsRoute";

export const routes = [...originalRoutes.routes, pendingInvitationsRoute, mfaChallengeRoute, mfaEnrollmentRoute];

export default BaseRoute;
