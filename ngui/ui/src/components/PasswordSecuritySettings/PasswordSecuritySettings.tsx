import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import ChangePasswordModal from "components/SideModalManager/SideModals/ChangePasswordModal";
import { useOpenTypedSideModal } from "hooks/useOpenTypedSideModal";
import { SPACING_1 } from "utils/layouts";

/** The password section of Profile → Security. */
const PasswordSecuritySettings = () => {
  const openSideModal = useOpenTypedSideModal();

  return (
    <Stack spacing={SPACING_1} alignItems="flex-start" data-test-id="password_security_settings">
      <Typography variant="subtitle1" fontWeight="bold">
        <FormattedMessage id="password" />
      </Typography>
      <Button
        variant="contained"
        color="primary"
        messageId="passwordSettings:changePassword"
        onClick={() => openSideModal(ChangePasswordModal, {})}
        dataTestId="btn_change_password"
      />
    </Stack>
  );
};

export default PasswordSecuritySettings;
