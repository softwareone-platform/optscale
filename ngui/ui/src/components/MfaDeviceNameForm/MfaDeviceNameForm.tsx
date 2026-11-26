import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "components/Button/Button";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import { TextInput } from "components/forms/common/fields";
import { SPACING_2 } from "utils/layouts";

const FIELD_NAME = "name";

type FormValues = { [FIELD_NAME]: string };

export type MfaDeviceNameFormProps = {
  /** What the name is for, above the field. */
  children?: ReactNode;
  defaultName?: string;
  submitMessageId: string;
  isLoading?: boolean;
  /** Gets the name trimmed — what the sign-in method picker shows as "Configured on {name}". */
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

/**
 * Names an authenticator app — the phone or app it lives on. The auth service needs a name for every one, and a user
 * may have several. Required, up to 255 characters, not only spaces: the field's own rules, within the service's.
 */
const MfaDeviceNameForm = ({
  children,
  defaultName = "",
  submitMessageId,
  isLoading = false,
  onSubmit,
  onCancel,
}: MfaDeviceNameFormProps) => {
  const intl = useIntl();

  const methods = useForm<FormValues>({ defaultValues: { [FIELD_NAME]: defaultName } });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(({ name }) => onSubmit(name.trim()))} noValidate>
        <Stack spacing={SPACING_2}>
          {children}
          <TextInput
            name={FIELD_NAME}
            label={<FormattedMessage id="mfaSetup:deviceName" />}
            placeholder={intl.formatMessage({ id: "mfaSetup:deviceNamePlaceholder" })}
            required
            autoFocus
            fullWidth
            dataTestId="input_mfa_device_name"
          />
        </Stack>
        <FormButtonsWrapper>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            isLoading={isLoading}
            messageId={submitMessageId}
            dataTestId="btn_submit_mfa_device_name"
          />
          <Button variant="outlined" messageId="cancel" onClick={onCancel} dataTestId="btn_cancel_mfa_device_name" />
        </FormButtonsWrapper>
      </form>
    </FormProvider>
  );
};

export default MfaDeviceNameForm;
