import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import ConfirmEmailVerificationCodeForm from "components/forms/ConfirmEmailVerificationCodeForm";
import { useNewAuthorization } from "hooks/useNewAuthorization";
import VerifyEmailService from "services/VerifyEmailService";
import { getQueryParams } from "utils/network";

type ConfirmEmailVerificationCodeContainerProps = {
  onSuccess: () => void;
};

const ConfirmEmailVerificationCodeContainer = ({ onSuccess }: ConfirmEmailVerificationCodeContainerProps) => {
  const { email } = getQueryParams() as { email: string };

  const { useGetEmailVerificationCodeToken } = VerifyEmailService();

  const { onGet: onGetEmailVerificationCodeToken, isLoading: isLoadingGetEmailVerificationCodeToken } =
    useGetEmailVerificationCodeToken();

  const { activateScope, isGetOrganizationsLoading, isCreateOrganizationLoading } = useNewAuthorization();

  return (
    <Box>
      <Typography>
        <FormattedMessage
          id="emailVerificationDescription"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
            email
          }}
        />
      </Typography>
      <Typography fontWeight="bold" gutterBottom>
        {email}
      </Typography>
      <ConfirmEmailVerificationCodeForm
        onSubmit={({ code }) =>
          onGetEmailVerificationCodeToken(email, code)
            .then(() =>
              activateScope(email, {
                getOnSuccessRedirectionPath: () => undefined
              })
            )
            .then(onSuccess)
        }
        isLoading={isLoadingGetEmailVerificationCodeToken || isGetOrganizationsLoading || isCreateOrganizationLoading}
      />
    </Box>
  );
};

export default ConfirmEmailVerificationCodeContainer;
