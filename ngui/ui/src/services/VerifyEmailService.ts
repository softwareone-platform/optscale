import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getToken, verifyEmail } from "api";
import { GET_TOKEN } from "api/auth/actionTypes";
import { VERIFY_EMAIL } from "api/restapi/actionTypes";
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
  const dispatch = useDispatch();

  const { isLoading } = useApiState(GET_TOKEN);

  const onGet = (email: string, code: string) =>
    new Promise((resolve, reject) => {
      dispatch((_, getState) => {
        dispatch(
          getToken({
            email,
            code
          })
        ).then(() => {
          if (!isError(GET_TOKEN, getState())) {
            return resolve();
          }
          return reject();
        });
      });
    });

  return { onGet, isLoading };
};

function VerifyEmailService() {
  return {
    useSendEmailVerificationCode,
    useGetEmailVerificationCodeToken
  };
}

export default VerifyEmailService;
