import { UpdateUserPassword } from "api/auth/users/types";
import { authError } from "api/mocked/errorBodies";
import { setMockPassword } from "api/mocked/state/password";
import { ERROR_BODY, USER_BODY } from "./fixtures";

/**
 * Stands in for `PATCH /auth/v2/users/{user_id}`, so a mocked recovery never changes a real account's password —
 * not even the real session's that the mocked sign-in hands out.
 */
export const updateUserPasswordMock: UpdateUserPassword = async ({ token, userId, password }) => {
  if (!token) {
    throw authError(ERROR_BODY.TOKEN_REQUIRED);
  }

  // The service edits whichever fields arrive; only a password changes what the mocked sign-in accepts.
  if (password) {
    setMockPassword(password);
  }

  return { ...USER_BODY, id: userId };
};
