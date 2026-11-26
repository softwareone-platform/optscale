import { requestAuth } from "../request";
import { AuthUser, UpdateUserPassword } from "./types";

/**
 * `PATCH /auth/v2/users/{user_id}`, which upstream reaches through GraphQL's `updateUser`. A new password changes the
 * salt every token is signed with, so `token` stops working.
 */
export const updateUserPassword: UpdateUserPassword = async ({ token, userId, password, currentPassword }) => {
  const { data } = await requestAuth<AuthUser>(`/users/${encodeURIComponent(userId)}`, {
    method: "PATCH",
    body: currentPassword === undefined ? { password } : { password, current_password: currentPassword },
    token,
  });

  return data;
};
