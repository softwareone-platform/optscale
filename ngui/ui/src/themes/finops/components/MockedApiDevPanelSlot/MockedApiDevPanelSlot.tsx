import { lazy, Suspense } from "react";
import { isMockedApiEnabled } from "@theme/api/mocked/config";
import { featureFlags } from "@theme/theme.features";

// `MODE` is a literal in a production build, so this folds to null and the panel chunk is never emitted.
const MockedApiDevPanel =
  import.meta.env.MODE === "development" &&
  isMockedApiEnabled({ mfaLogin: featureFlags.mfa_login, mockedApiEnv: import.meta.env.VITE_MOCKED_API })
    ? lazy(() => import("@theme/api/mocked/devPanel"))
    : null;

/** The only app code that reaches into `api/mocked/`: the dev panel, in development while the mocks answer. */
const MockedApiDevPanelSlot = () =>
  MockedApiDevPanel && (
    <Suspense fallback={null}>
      <MockedApiDevPanel />
    </Suspense>
  );

export default MockedApiDevPanelSlot;
