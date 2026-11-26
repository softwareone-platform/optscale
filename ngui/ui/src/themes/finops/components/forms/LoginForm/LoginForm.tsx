import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { EmailField, FormButtons, PasswordField } from "@main/components/forms/LoginForm/FormElements";
import { FormValues, LoginFormProps } from "@main/components/forms/LoginForm/types";
import { getDefaultValues } from "@main/components/forms/LoginForm/utils";
import { PASSWORD_RECOVERY, OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME } from "urls";
import { stringifySearchParams, getSearchParams } from "utils/network";

const LoginForm = ({ onSubmit, isLoading = false, disabled = false, isInvited = false }: LoginFormProps) => {
  const { email = "", [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getSearchParams() as {
    email?: string;
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
  };

  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues({
      email
    })
  });

  const { handleSubmit } = methods;

  const passwordRecoveryUrl = `${PASSWORD_RECOVERY}?${stringifySearchParams({
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability
  })}`;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <EmailField readOnly={isInvited} />
        <PasswordField />
        <FormButtons isLoading={isLoading} disabled={disabled} />
        <Box display="flex" justifyContent="space-evenly">
          <Typography>
            <Link color="primary" to={passwordRecoveryUrl} component={RouterLink}>
              <FormattedMessage id="forgotPassword" />
            </Link>
          </Typography>
        </Box>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
