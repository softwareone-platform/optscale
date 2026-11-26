import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { SPACING_2 } from "utils/layouts";

type SignedInStepProps = {
  messageId: string;
  onProceed: () => void;
  proceedMessageId?: string;
};

/** The last screen of password recovery and e-mail verification, as upstream has it. */
const SignedInStep = ({ messageId, onProceed, proceedMessageId = "proceedToOptScale" }: SignedInStepProps) => (
  <Stack spacing={SPACING_2}>
    <div>
      <Typography>
        <FormattedMessage id={messageId} />
      </Typography>
    </div>
    <div>
      <Typography>
        <Link color="primary" component="button" onClick={onProceed} data-test-id="btn_proceed_to_app">
          <FormattedMessage id={proceedMessageId} />
        </Link>
      </Typography>
    </div>
  </Stack>
);

export default SignedInStep;
