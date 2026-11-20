import { ERROR_BODY } from "@theme/api/mocked/auth/mfaMethods/fixtures";
import { MOCKED_REAL_SESSION_PATH } from "@theme/api/mocked/config";
import { authError } from "@theme/api/mocked/errorBodies";
import { MockedRoute, noContent, ok, readString } from "@theme/api/mocked/http/router";
import { forgetRealSession, getRealSessionStatus, storeRealSession } from "@theme/api/mocked/state/realSession";

const REAL_SESSION_PATH = `/auth/v2${MOCKED_REAL_SESSION_PATH}`;

/** A non-empty string, or `400 OA0060` naming the field. */
const readRequiredString = (field: string, value: unknown) => {
  const text = readString(value);

  if (!text) {
    throw authError(ERROR_BODY.INVALID_VALUE, [field]);
  }

  return text;
};

const REAL_SESSION_ROUTE = { path: REAL_SESSION_PATH, answersRealSignIn: true, skipsLatency: true } as const;

export const SESSION_ROUTES: MockedRoute[] = [
  {
    ...REAL_SESSION_ROUTE,
    method: "GET",
    handle: async () => ok(getRealSessionStatus())
  },
  {
    ...REAL_SESSION_ROUTE,
    method: "POST",
    handle: async ({ body }) => {
      storeRealSession({
        token: readRequiredString("token", body.token),
        user_id: readRequiredString("user_id", body.user_id),
        user_email: readRequiredString("user_email", body.user_email)
      });

      return ok(getRealSessionStatus());
    }
  },
  {
    ...REAL_SESSION_ROUTE,
    method: "DELETE",
    handle: async () => {
      forgetRealSession();

      return noContent();
    }
  }
];
