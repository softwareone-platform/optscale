import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

const AttemptsLeft = ({ count }: { count: number }) => (
  <Typography
    variant="body2"
    align="center"
    fontWeight={count === 1 ? "bold" : undefined}
    color={count === 1 ? "error" : "text.primary"}
    data-test-id="p_attempts_left"
  >
    <FormattedMessage id="signIn:attemptsLeft" values={{ count }} />
  </Typography>
);

export default AttemptsLeft;
