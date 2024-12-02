import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import CreateNewPasswordForm from "components/forms/CreateNewPasswordForm";
import { useNewAuthorization } from "hooks/useNewAuthorization";
import ResetPasswordServices from "services/ResetPasswordServices";
import { getQueryParams } from "utils/network";

type CreateNewPasswordContainerProps = {
  onSuccess: () => void;
};

const CreateNewPasswordContainer = ({ onSuccess }: CreateNewPasswordContainerProps) => {
  const { email } = getQueryParams() as { email: string };

  const { useUpdateUserPassword, useGetNewToken } = ResetPasswordServices();

  const { onUpdate: onUpdateUserPassword, isLoading: isUpdateUserPasswordLoading } = useUpdateUserPassword();
  const { onGet: onGetNewToken, isLoading: isGetNewTokenLoading } = useGetNewToken();

  const { activateScope, isGetOrganizationsLoading, isCreateOrganizationLoading } = useNewAuthorization();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography>
        <FormattedMessage id="enterNewPasswordToResetAccountPassword" />
      </Typography>
      <CreateNewPasswordForm
        onSubmit={({ newPassword }) =>
          onUpdateUserPassword(newPassword)
            .then(() => onGetNewToken(email, newPassword))
            .then(() =>
              activateScope(email, {
                getOnSuccessRedirectionPath: () => undefined
              })
            )
            .then(() => onSuccess())
        }
        isLoading={
          isUpdateUserPasswordLoading || isGetNewTokenLoading || isGetOrganizationsLoading || isCreateOrganizationLoading
        }
      />
    </Box>
  );
};

export default CreateNewPasswordContainer;
