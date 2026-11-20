import { AuthApiError } from "@theme/api/auth/signIn/errors";
import { completeLoginChallengeMock, createTokenMock, resolveLoginOptionsMock } from "@theme/api/mocked/auth/signIn";
import { readSignInScenarioCookie } from "./signInScenarioCookie";

export type MockedResponse = {
  status: number;
  body: unknown;
};

/** What the plugin passes on from the incoming request besides its JSON body. */
export type MockedRequestContext = {
  cookie: string;
};

export type MockedHandler = (body: Record<string, string>, context: MockedRequestContext) => Promise<MockedResponse>;

/** Rebuilds the optscale error envelope the real service would have sent over the wire. */
const toErrorResponse = (error: unknown): MockedResponse => {
  if (error instanceof AuthApiError) {
    return {
      status: error.status,
      body: { error: { status_code: error.status, error_code: error.errorCode, reason: error.message, params: error.params } }
    };
  }

  throw error;
};

// One route, two requests: the password step sends credentials, the MFA step a challenge.
const createToken: MockedHandler = async ({ email, password, challenge_id, method_id, code }, { cookie }) => {
  try {
    if (challenge_id) {
      return { status: 201, body: await completeLoginChallengeMock({ challenge_id, method_id, code }) };
    }

    const { status, data } = await createTokenMock({ email, password }, readSignInScenarioCookie(cookie));

    return { status, body: data };
  } catch (error) {
    return toErrorResponse(error);
  }
};

const loginOptions: MockedHandler = async ({ email }) => ({
  status: 200,
  body: await resolveLoginOptionsMock({ email })
});

/**
 * Routes the dev-server plugin answers instead of forwarding them upstream. Keyed by
 * `"<METHOD> <path>"` with the path as the auth service sees it, without the dev `/api` prefix.
 */
export const MOCKED_ROUTES: Record<string, MockedHandler> = {
  "POST /auth/v2/login_options": loginOptions,
  "POST /auth/v2/tokens": createToken
};
