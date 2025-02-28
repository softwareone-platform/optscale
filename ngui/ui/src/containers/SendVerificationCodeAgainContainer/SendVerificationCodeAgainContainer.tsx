import SendVerificationCodeAgainMessage from "components/SendVerificationCodeAgainCountdownMessage";
import ResetPasswordServices from "services/ResetPasswordServices";
import { OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME } from "urls";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import { getQueryParams } from "utils/network";

const SendVerificationCodeAgainContainer = () => {
  const { email } = getQueryParams() as { email: string };

  const { useSendVerificationCode } = ResetPasswordServices();

  const { onSend, isLoading } = useSendVerificationCode();

  const { [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getQueryParams() as {
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
  };

  return (
    <SendVerificationCodeAgainMessage
      onSend={() =>
        onSend(email, {
          [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: Object.values(OPTSCALE_CAPABILITY).includes(capability)
            ? capability
            : undefined
        })
      }
      sendingVerificationCode={isLoading}
    />
  );
};

export default SendVerificationCodeAgainContainer;
