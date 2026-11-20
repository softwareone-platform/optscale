import { AuthUser } from "api/auth/users/types";
import { asErrorBody } from "api/mocked/errorBodies";
import user from "api/mocked/responses/auth/v2/users/200-user.json";
import tokenRequired from "api/mocked/responses/auth/v2/users/401-token-required.json";

/**
 * The typed side of `responses/auth/v2/users/`: a `GET /auth/v2/users/{user_id}` capture from the auth service, its
 * personal values swapped for the mocked user's. `PATCH` answers the same body.
 */

export const USER_BODY: AuthUser = user;

export const ERROR_BODY = Object.freeze({
  TOKEN_REQUIRED: asErrorBody(tokenRequired)
});
