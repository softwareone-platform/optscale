import { requestAuth } from "../request";
import { AuthUser, UpdateUserPassword } from "./types";

/**
 * `PATCH /auth/v2/users/{user_id}`, which upstream reaches through GraphQL's `updateUser` — called directly so the dev
 * mock can answer it. A new password changes the salt every token is signed with, so `token` stops working.
 */
export const updateUserPassword: UpdateUserPassword = async ({ token, userId, password }) => {
  const { data } = await requestAuth<AuthUser>(`/users/${encodeURIComponent(userId)}`, {
    method: "PATCH",
    body: { password },
    token
  });

  return data;
};
