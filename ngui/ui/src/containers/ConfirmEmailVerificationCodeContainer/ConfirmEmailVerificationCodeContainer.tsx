import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import ConfirmEmailVerificationCodeForm from "components/forms/ConfirmEmailVerificationCodeForm";
import VerifyEmailService from "services/VerifyEmailService";
import { getQueryParams } from "utils/network";

type ConfirmEmailVerificationCodeContainerProps = {
  onSuccess: (args: { user_id: string; user_email: string; token: string }) => void;
};

const ConfirmEmailVerificationCodeContainer = ({ onSuccess }: ConfirmEmailVerificationCodeContainerProps) => {
  const { email } = getQueryParams() as { email: string };

  const { useGetEmailVerificationCodeToken } = VerifyEmailService();

  const { onGet, isLoading } = useGetEmailVerificationCodeToken();

  return (
    <Box>
      <Typography>
        <FormattedMessage id="emailVerificationDescription" />
      </Typography>
      <Typography fontWeight="bold" gutterBottom>
        {email}
      </Typography>
      <ConfirmEmailVerificationCodeForm onSubmit={({ code }) => onGet(email, code).then(onSuccess)} isLoading={isLoading} />
    </Box>
  );
};

export default ConfirmEmailVerificationCodeContainer;
