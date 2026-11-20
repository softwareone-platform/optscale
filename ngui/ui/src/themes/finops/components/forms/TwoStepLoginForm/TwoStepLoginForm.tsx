import { FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { FIELD_NAMES } from "@main/components/forms/LoginForm/constants";
import { EmailField, FormButtons, PasswordField } from "@main/components/forms/LoginForm/FormElements";
import { FormValues } from "@main/components/forms/LoginForm/types";
import { getDefaultValues } from "@main/components/forms/LoginForm/utils";
import { LOGIN_METHOD } from "@theme/api/auth/signIn";
import { useLoginOptions } from "@theme/hooks/useLoginOptions";
import ButtonLoader from "components/ButtonLoader";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { PASSWORD_RECOVERY, OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME } from "urls";
import { stringifySearchParams, getSearchParams } from "utils/network";
import { LOGIN_STEP } from "./constants";
import { LoginFormError, LoginStep, TwoStepLoginFormProps } from "./types";

/**
 * The two-step login: the address is entered first and `login_options` resolves what it can
 * authenticate with, only then is a password asked for. Nothing navigates before *Continue*.
 */
const TwoStepLoginForm = ({
  onSubmit,
  isLoading = false,
  disabled = false,
  isInvited = false,
  error = null
}: TwoStepLoginFormProps) => {
  const { email = "", [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getSearchParams() as {
    email?: string;
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
  };

  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues({
      email
    })
  });

  const { handleSubmit, getValues, resetField, setFocus, trigger } = methods;

  const [step, setStep] = useState<LoginStep>(LOGIN_STEP.EMAIL);
  const [stepError, setStepError] = useState<LoginFormError | null>(null);

  const { onResolveLoginOptions, isLoading: isResolvingLoginOptions } = useLoginOptions();

  // A rejected attempt leaves the entered email in place and hands the password field back empty.
  useEffect(() => {
    if (error) {
      resetField(FIELD_NAMES.PASSWORD);
      setFocus(FIELD_NAMES.PASSWORD);
    }
  }, [error, resetField, setFocus]);

  const passwordRecoveryUrl = `${PASSWORD_RECOVERY}?${stringifySearchParams({
    [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability
  })}`;

  const isEmailStep = step === LOGIN_STEP.EMAIL;

  const continueToPasswordStep = async () => {
    setStepError(null);

    const isEmailValid = await trigger(FIELD_NAMES.EMAIL);

    if (!isEmailValid) {
      return;
    }

    try {
      const { methods: loginMethods } = await onResolveLoginOptions({ email: getValues(FIELD_NAMES.EMAIL) });

      if (!loginMethods.includes(LOGIN_METHOD.PASSWORD)) {
        setStepError({ messageId: "somethingWentWrong" });
        return;
      }

      setStep(LOGIN_STEP.PASSWORD);
    } catch {
      setStepError({ messageId: "somethingWentWrong" });
    }
  };

  // The email step owns its own submit so only the address is validated — the password field is
  // not mounted yet, and handleSubmit would have nothing to say about it.
  const handleEmailStepSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void continueToPasswordStep();
  };

  const backToEmailStep = () => {
    setStep(LOGIN_STEP.EMAIL);
    resetField(FIELD_NAMES.PASSWORD);
  };

  const displayedError = error ?? stepError;

  return (
    <FormProvider {...methods}>
      <form onSubmit={isEmailStep ? handleEmailStepSubmit : handleSubmit(onSubmit)} noValidate>
        {displayedError && (
          <InlineSeverityAlert
            severity="error"
            messageId={displayedError.messageId}
            messageDataTestId="p_login_error"
            sx={{ mt: 2 }}
          />
        )}
        <EmailField readOnly={isInvited || !isEmailStep} />
        {isEmailStep ? (
          // Not FormButtons: that one hardcodes the "login" label and test id.
          <FormButtonsWrapper mt={3} mb={2}>
            <ButtonLoader
              dataTestId="btn_continue"
              variant="contained"
              color="primary"
              isLoading={isResolvingLoginOptions}
              disabled={disabled}
              messageId="signIn:continue"
              type="submit"
              size="large"
              fullWidth
            />
          </FormButtonsWrapper>
        ) : (
          <>
            <PasswordField />
            <FormButtons isLoading={isLoading} disabled={disabled} />
            {!isInvited && (
              <Box display="flex" justifyContent="center" mb={2}>
                <Typography>
                  <Link
                    component="button"
                    type="button"
                    color="primary"
                    onClick={backToEmailStep}
                    data-test-id="btn_use_different_email"
                  >
                    <FormattedMessage id="signIn:useDifferentEmail" />
                  </Link>
                </Typography>
              </Box>
            )}
          </>
        )}
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

export default TwoStepLoginForm;
