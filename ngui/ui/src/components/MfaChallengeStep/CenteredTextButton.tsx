import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";

type CenteredTextButtonProps = {
  messageId: string;
  onClick: () => void;
  disabled?: boolean;
  dataTestId: string;
};

/** A secondary action under the sign-in form, drawn as a link so it does not compete with the main button. */
const CenteredTextButton = ({ messageId, onClick, disabled, dataTestId }: CenteredTextButtonProps) => (
  <Box display="flex" justifyContent="center">
    <Link component="button" type="button" color="primary" disabled={disabled} onClick={onClick} data-test-id={dataTestId}>
      <FormattedMessage id={messageId} />
    </Link>
  </Box>
);

export default CenteredTextButton;
