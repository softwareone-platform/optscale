import SendVerificationCodeAgainMessage from "components/SendVerificationCodeAgainCountdownMessage";
import VerifyEmailService from "services/VerifyEmailService";
import { getQueryParams } from "utils/network";

const SendEmailVerificationCodeAgainContainer = () => {
  const { email } = getQueryParams() as { email: string };

  const { useSendEmailVerificationCode } = VerifyEmailService();

  const { onSend, isLoading } = useSendEmailVerificationCode();

  return <SendVerificationCodeAgainMessage onSend={() => onSend(email)} sendingVerificationCode={isLoading} />;
};

export default SendEmailVerificationCodeAgainContainer;
