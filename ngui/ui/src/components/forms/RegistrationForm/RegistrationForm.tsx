import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ButtonLoader from "components/ButtonLoader";
import { HYSTAX_PRIVACY_POLICY, LOGIN } from "urls";
import { getSearchParams } from "utils/network";
import { ConfirmPassword, EmailField, FullNameField, PasswordField } from "./FormElements";
import useStyles from "./RegistrationForm.styles";
import { FormValues, RegistrationFormProps } from "./types";
import { getDefaultValues } from "./utils";

const RegistrationForm = ({ onSubmit, isLoading = false, disabled = false, isInvited = false }: RegistrationFormProps) => {
  const { classes } = useStyles();

  const { email = "" } = getSearchParams() as { email?: string };

  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues({
      email
    })
  });
  const { handleSubmit } = methods;

  const { search } = useLocation();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <EmailField readOnly={isInvited} />
        <FullNameField />
        <PasswordField />
        <ConfirmPassword />
        <Box className={classes.registerButtonWrapper}>
          <ButtonLoader
            dataTestId="btn_register"
            variant="contained"
            color="primary"
            customWrapperClass={classes.registerButton}
            isLoading={isLoading}
            disabled={disabled}
            messageId="register"
            type="submit"
            size="large"
            fullWidth
          />
          <Typography variant="caption" align="center" component="div">
            <FormattedMessage
              id="agreeToHystaxPrivacyPolicyUponRegistration"
              values={{
                link: (chunks) => (
                  <Link data-test-id="link_privacy_policy" href={HYSTAX_PRIVACY_POLICY} target="_blank" rel="noopener">
                    {chunks}
                  </Link>
                )
              }}
            />
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography>
            <Link data-test-id="link_sign_in" color="primary" to={`${LOGIN}${search}`} component={RouterLink}>
              <FormattedMessage id="haveAccountSignIn" />
            </Link>
          </Typography>
        </Box>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
