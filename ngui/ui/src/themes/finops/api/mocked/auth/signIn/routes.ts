import { created, MockedRoute, noContent, ok, readString, RouteHandler } from "@theme/api/mocked/http/router";
import { completeLoginChallengeMock } from "./completeLoginChallengeMock";
import { createTokenMock } from "./createTokenMock";
import { resolveLoginOptionsMock } from "./loginOptionsMock";
import { requestChallengeCodeMock } from "./requestChallengeCodeMock";

// One route, two requests: the password or code step sends credentials, the MFA step a challenge.
const createToken: RouteHandler = async ({ body, scenarios }) => {
  const challengeId = readString(body.challenge_id);

  if (challengeId) {
    return created(
      await completeLoginChallengeMock({
        challenge_id: challengeId,
        method_id: readString(body.method_id),
        code: readString(body.code)
      })
    );
  }

  const email = readString(body.email);
  const verificationCode = readString(body.verification_code);
  const { status, data } = await createTokenMock(
    verificationCode ? { email, verification_code: verificationCode } : { email, password: readString(body.password) },
    scenarios.signIn
  );

  return { status, body: data };
};

export const SIGN_IN_ROUTES: MockedRoute[] = [
  {
    method: "POST",
    path: "/auth/v2/login_options",
    handle: async ({ body }) => ok(await resolveLoginOptionsMock({ email: readString(body.email) })),
    answersRealSignIn: true
  },
  {
    method: "POST",
    path: "/auth/v2/tokens",
    handle: createToken
  },
  {
    method: "POST",
    path: "/auth/v2/login_challenges/:challenge_id/codes",
    handle: async ({ body, params }) => {
      await requestChallengeCodeMock({ challengeId: params.challenge_id, method_id: readString(body.method_id) });

      return noContent();
    }
  }
];
