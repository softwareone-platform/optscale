import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { restorePassword } from "api";
import { RESTORE_PASSWORD } from "api/restapi/actionTypes";
import { CREATE_TOKEN, UPDATE_USER } from "graphql/api/auth/queries";
import { useApiState } from "hooks/useApiState";
import { isError } from "utils/api";

const useSendVerificationCode = () => {
  const dispatch = useDispatch();

  const { isLoading } = useApiState(RESTORE_PASSWORD);

  const onSend = (email: string) =>
    new Promise((resolve, reject) => {
      dispatch((_, getState) => {
        dispatch(restorePassword(email)).then(() => {
          if (!isError(RESTORE_PASSWORD, getState())) {
            return resolve();
          }
          return reject();
        });
      });
    });

  return { onSend, isLoading };
};

const useGetVerificationCodeToken = () => {
  const [createToken, { loading: loginLoading }] = useMutation(CREATE_TOKEN);

  const onGet = (email: string, code: string) =>
    createToken({ variables: { email, code } }).then(({ data: { token } }) => Promise.resolve(token));

  return { onGet, isLoading: loginLoading };
};

const useUpdateUserPassword = () => {
  const [updateUser, { loading: updateUserLoading }] = useMutation(UPDATE_USER);

  const onUpdate = (
    token: {
      user_id: string;
      user_email: string;
      token: string;
    },
    newPassword: string
  ) =>
    updateUser({
      variables: {
        id: token.user_id,
        params: { password: newPassword }
      },
      context: {
        headers: {
          "x-optscale-token": token.token
        }
      }
    });

  return { onUpdate, isLoading: updateUserLoading };
};

const useGetNewToken = () => {
  const [createToken, { loading: loginLoading }] = useMutation(CREATE_TOKEN);

  const onGet = (email: string, password: string) =>
    createToken({ variables: { email, password } }).then(({ data: { token } }) => Promise.resolve(token));

  return { onGet, isLoading: loginLoading };
};

function ResetPasswordServices() {
  return { useSendVerificationCode, useGetVerificationCodeToken, useUpdateUserPassword, useGetNewToken };
}

export default ResetPasswordServices;
