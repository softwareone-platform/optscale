import { lazy, Suspense } from "react";
import { isMockedApiEnabled } from "api/mocked/config";
import { IS_MFA_LOGIN_ENABLED } from "utils/mfaLogin";

// `MODE` is a literal in a production build, so this folds to null and the panel chunk is never emitted.
const MockedApiDevPanel =
  import.meta.env.MODE === "development" &&
  isMockedApiEnabled({ mfaLogin: IS_MFA_LOGIN_ENABLED, mockedApiEnv: import.meta.env.VITE_MOCKED_API })
    ? lazy(() => import("api/mocked/devPanel"))
    : null;

/** The only app code that reaches into `api/mocked/`: the dev panel, in development while the mocks answer. */
const MockedApiDevPanelSlot = () =>
  MockedApiDevPanel && (
    <Suspense fallback={null}>
      <MockedApiDevPanel />
    </Suspense>
  );

export default MockedApiDevPanelSlot;
