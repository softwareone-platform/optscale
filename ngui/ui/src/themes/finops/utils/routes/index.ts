import * as originalRoutes from "@main/utils/routes";
import { featureFlags } from "@theme/theme.features";
import BaseRoute from "@theme/utils/routes/baseRoute";
import mfaChallengeRoute from "@theme/utils/routes/mfaChallengeRoute";
import mfaEnrollmentRoute from "@theme/utils/routes/mfaEnrollmentRoute";
import pendingInvitationsRoute from "@theme/utils/routes/pendingInvitationsRoute";
import profileRoute from "@theme/utils/routes/profileRoute";

// The MFA screens and the Profile page exist only while the MFA work is on; with `mfa_login` off the app is upstream's.
const mfaRoutes = featureFlags.mfa_login ? [mfaChallengeRoute, mfaEnrollmentRoute, profileRoute] : [];

export const routes = [...originalRoutes.routes, pendingInvitationsRoute, ...mfaRoutes];

export default BaseRoute;
