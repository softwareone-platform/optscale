import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import CreateNewPasswordForm from "components/forms/CreateNewPasswordForm";
import ResetPasswordServices from "services/ResetPasswordServices";
import { getQueryParams } from "utils/network";

type CreateNewPasswordContainerProps = {
  verificationCodeToken: {
    user_id: string;
    user_email: string;
    token: string;
  };
  onSuccess: (args: { user_id: string; user_email: string; token: string }) => void;
};

const CreateNewPasswordContainer = ({ verificationCodeToken, onSuccess }: CreateNewPasswordContainerProps) => {
  const { email } = getQueryParams() as { email: string };

  const { useUpdateUserPassword, useGetNewToken } = ResetPasswordServices();

  const { onUpdate: onUpdateUserPassword, isLoading: isUpdateUserPasswordLoading } = useUpdateUserPassword();
  const { onGet: onGetNewToken, isLoading: isGetNewTokenLoading } = useGetNewToken();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography>
        <FormattedMessage id="enterNewPasswordToResetAccountPassword" />
      </Typography>
      <CreateNewPasswordForm
        onSubmit={({ newPassword }) =>
          onUpdateUserPassword(verificationCodeToken, newPassword)
            .then(() => onGetNewToken(email, newPassword))
            .then(onSuccess)
        }
        isLoading={isUpdateUserPasswordLoading || isGetNewTokenLoading}
      />
    </Box>
  );
};

export default CreateNewPasswordContainer;
