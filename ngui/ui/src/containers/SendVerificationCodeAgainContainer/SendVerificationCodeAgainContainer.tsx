import SendVerificationCodeAgainMessage from "components/SendVerificationCodeAgainCountdownMessage";
import ResetPasswordServices from "services/ResetPasswordServices";
import { getQueryParams } from "utils/network";

const SendVerificationCodeAgainContainer = () => {
  const { email } = getQueryParams() as { email: string };

  const { useSendVerificationCode } = ResetPasswordServices();

  const { onSend, isLoading } = useSendVerificationCode();

  return <SendVerificationCodeAgainMessage onSend={() => onSend(email)} sendingVerificationCode={isLoading} />;
};

export default SendVerificationCodeAgainContainer;
