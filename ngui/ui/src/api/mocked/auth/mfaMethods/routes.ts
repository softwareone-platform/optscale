import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import { created, enumReader, MockedRoute, noContent, ok, readSignedInUser, readString } from "api/mocked/http/router";
import { confirmChallengeEnrollmentMock, startChallengeEnrollmentMock } from "./challengeEnrollmentMock";
import { ERROR_BODY } from "./fixtures";
import {
  confirmMfaEnrollmentMock,
  deleteMfaMethodMock,
  getMfaStatusMock,
  resetMfaMock,
  startMfaEnrollmentMock,
  updateMfaMethodMock
} from "./mfaMethodsMock";

const readMethodType = enumReader(MFA_METHOD_TYPE, "type", ERROR_BODY.INVALID_VALUE);

export const MFA_METHODS_ROUTES: MockedRoute[] = [
  {
    method: "GET",
    path: "/auth/v2/users/:user_id/mfa_methods",
    handle: async (request) => ok(await getMfaStatusMock(readSignedInUser(request), request.scenarios.security))
  },
  {
    method: "POST",
    path: "/auth/v2/users/:user_id/mfa_methods",
    handle: async (request) => {
      const { body, params, scenarios } = request;
      const type = readMethodType(body.type);
      const label = typeof body.label === "string" ? body.label : undefined;
      const challengeId = readString(body.challenge_id);

      if (challengeId) {
        return created(await startChallengeEnrollmentMock({ userId: params.user_id, challengeId, type, label }));
      }

      return created(await startMfaEnrollmentMock({ ...readSignedInUser(request), type, label }, scenarios.security));
    }
  },
  {
    method: "DELETE",
    path: "/auth/v2/users/:user_id/mfa_methods",
    handle: async (request) => {
      await resetMfaMock(readSignedInUser(request), request.scenarios.security);

      return noContent();
    }
  },
  {
    method: "POST",
    path: "/auth/v2/users/:user_id/mfa_methods/:method_id/confirm",
    // With a `challenge_id` the confirmation also finishes the sign-in: 201 with the token.
    handle: async (request) => {
      const { body, params, scenarios } = request;
      const methodId = params.method_id;
      const code = readString(body.code);
      const challengeId = readString(body.challenge_id);

      if (challengeId) {
        return created(await confirmChallengeEnrollmentMock({ userId: params.user_id, challengeId, methodId, code }));
      }

      return ok(await confirmMfaEnrollmentMock({ ...readSignedInUser(request), methodId, code }, scenarios.security));
    }
  },
  {
    method: "PATCH",
    path: "/auth/v2/users/:user_id/mfa_methods/:method_id",
    handle: async (request) => {
      const { body, params, scenarios } = request;

      return ok(
        await updateMfaMethodMock(
          {
            ...readSignedInUser(request),
            methodId: params.method_id,
            is_default: typeof body.is_default === "boolean" ? body.is_default : undefined,
            label: typeof body.label === "string" ? body.label : undefined
          },
          scenarios.security
        )
      );
    }
  },
  {
    method: "DELETE",
    path: "/auth/v2/users/:user_id/mfa_methods/:method_id",
    handle: async (request) => {
      await deleteMfaMethodMock(
        { ...readSignedInUser(request), methodId: request.params.method_id },
        request.scenarios.security
      );

      return noContent();
    }
  }
];
