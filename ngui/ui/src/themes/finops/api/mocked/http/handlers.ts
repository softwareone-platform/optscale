import { AuthApiError } from "@theme/api/auth/signIn/errors";
import { createTokenMock, resolveLoginOptionsMock } from "@theme/api/mocked/auth/signIn";

export type MockedResponse = {
  status: number;
  body: unknown;
};

type MockedHandler = (body: Record<string, string>) => Promise<MockedResponse>;

/** Rebuilds the optscale error envelope the real service would have sent over the wire. */
const toErrorResponse = (error: unknown): MockedResponse => {
  if (error instanceof AuthApiError) {
    return {
      status: error.status,
      body: { error: { error_code: error.errorCode, reason: error.message } }
    };
  }

  throw error;
};

const createToken: MockedHandler = async ({ email, password }) => {
  try {
    const { status, data } = await createTokenMock({ email, password });

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
