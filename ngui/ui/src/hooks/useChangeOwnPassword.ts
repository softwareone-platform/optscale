import { useCallback } from "react";
import { updateUserPassword } from "api/auth/users";
import { useGetToken } from "hooks/useGetToken";
import { useIsCurrentPasswordCheckEnabled } from "hooks/useIsCurrentPasswordCheckEnabled";
import { useSignOutOnUnauthorized } from "hooks/useSignOutOnUnauthorized";

/** Sets the signed-in user's password. On success the session's token is dead: the new password changed its salt. */
export const useChangeOwnPassword = () => {
  const { token, userId } = useGetToken();
  const signOutOnUnauthorized = useSignOutOnUnauthorized();
  const isCurrentPasswordCheckEnabled = useIsCurrentPasswordCheckEnabled();

  return useCallback(
    ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      signOutOnUnauthorized(
        updateUserPassword({
          token,
          userId,
          password: newPassword,
          currentPassword: isCurrentPasswordCheckEnabled ? currentPassword : undefined,
        })
      ),
    [token, userId, signOutOnUnauthorized, isCurrentPasswordCheckEnabled]
  );
};
