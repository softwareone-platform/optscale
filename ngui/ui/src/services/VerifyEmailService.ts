import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { verifyEmail } from "api";
import { VERIFY_EMAIL } from "api/restapi/actionTypes";
import { CREATE_TOKEN } from "graphql/api/auth/queries";
import { useApiState } from "hooks/useApiState";
import { isError } from "utils/api";

const useSendEmailVerificationCode = () => {
  const dispatch = useDispatch();

  const { isLoading } = useApiState(VERIFY_EMAIL);

  const onSend = useCallback(
    (email: string) =>
      new Promise((resolve, reject) => {
        dispatch((_, getState) => {
          dispatch(verifyEmail(email)).then(() => {
            if (!isError(VERIFY_EMAIL, getState())) {
              return resolve();
            }
            return reject();
          });
        });
      }),
    [dispatch]
  );

  return { onSend, isLoading };
};

const useGetEmailVerificationCodeToken = () => {
  const [createToken, { loading: loginLoading }] = useMutation(CREATE_TOKEN);

  const onGet = (email: string, code: string) =>
    createToken({ variables: { email, code } }).then(({ data: { token } }) => Promise.resolve(token));

  return { onGet, isLoading: loginLoading };
};

function VerifyEmailService() {
  return {
    useSendEmailVerificationCode,
    useGetEmailVerificationCodeToken
  };
}

export default VerifyEmailService;
