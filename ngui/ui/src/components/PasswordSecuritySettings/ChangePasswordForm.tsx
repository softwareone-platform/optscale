import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { flushSync } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import { PasswordInput } from "components/forms/common/fields";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { useChangeOwnPassword } from "hooks/useChangeOwnPassword";
import { useGetToken } from "hooks/useGetToken";
import { useSignOut } from "hooks/useSignOut";
import { getPasswordRecoveryUrl } from "urls";
import { SPACING_1 } from "utils/layouts";
import { rememberPasswordChanged } from "utils/passwordChangedNotice";

const FIELD_NAMES = Object.freeze({
  CURRENT_PASSWORD: "currentPassword",
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword",
});

type FormValues = Record<(typeof FIELD_NAMES)[keyof typeof FIELD_NAMES], string>;

/** The content of `ChangePasswordModal`. Both ways out end the session: the new password, or recovery, which is signed out. */
const ChangePasswordForm = ({ onClose }: { onClose: () => void }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { userEmail } = useGetToken();
  const changeOwnPassword = useChangeOwnPassword();
  const signOut = useSignOut();

  const [isSaving, setIsSaving] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: { [FIELD_NAMES.CURRENT_PASSWORD]: "", [FIELD_NAMES.NEW_PASSWORD]: "", [FIELD_NAMES.CONFIRM_PASSWORD]: "" },
  });

  const save = async ({ currentPassword, newPassword }: FormValues) => {
    setHasFailed(false);
    setIsSaving(true);

    try {
      await changeOwnPassword({ currentPassword, newPassword });
    } catch {
      setHasFailed(true);
      setIsSaving(false);
      return;
    }

    rememberPasswordChanged();
    signOut();
  };

  const recoverPassword = () => {
    // Rendered on the recovery page before the token goes, or the sign-out redirects to the login page instead.
    flushSync(() => navigate(getPasswordRecoveryUrl(userEmail ?? "")));
    signOut();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(save)} noValidate>
        {hasFailed && (
          <InlineSeverityAlert
            severity="error"
            messageId="passwordSettings:changeFailed"
            messageDataTestId="p_change_password_error"
            sx={{ mb: 1 }}
          />
        )}
        <Stack>
          <PasswordInput
            name={FIELD_NAMES.CURRENT_PASSWORD}
            required
            label={<FormattedMessage id="passwordSettings:currentPassword" />}
            margin="normal"
            autoComplete="current-password"
            dataTestId="input_current_password"
          />
          <PasswordInput
            name={FIELD_NAMES.NEW_PASSWORD}
            required
            label={<FormattedMessage id="passwordSettings:newPassword" />}
            margin="normal"
            autoComplete="new-password"
            minLength={6}
            dataTestId="input_new_password"
          />
          <PasswordInput
            name={FIELD_NAMES.CONFIRM_PASSWORD}
            required
            label={<FormattedMessage id="confirmPassword" />}
            margin="normal"
            autoComplete="new-password"
            validate={{
              match: (value: string, formValues: FormValues) =>
                value === formValues[FIELD_NAMES.NEW_PASSWORD] || intl.formatMessage({ id: "passwordsDoNotMatch" }),
            }}
            dataTestId="input_confirm_password"
          />
        </Stack>
        <FormButtonsWrapper justifyContent="space-between">
          <Button variant="text" messageId="close" onClick={onClose} dataTestId="btn_close_change_password_form" />
          <Box display="flex" gap={SPACING_1}>
            <Button
              variant="outlined"
              messageId="forgotPassword"
              onClick={recoverPassword}
              disabled={isSaving}
              dataTestId="btn_forgot_password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              messageId="save"
              isLoading={isSaving}
              dataTestId="btn_save_password"
            />
          </Box>
        </FormButtonsWrapper>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
